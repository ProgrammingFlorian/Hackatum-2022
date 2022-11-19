package de.hkwh.backend.service;

import de.hkwh.backend.datatransferobjects.VehicleDTO;
import de.hkwh.backend.datatransferobjects.VehicleSchedulingDTO;
import de.hkwh.backend.datatransferobjects.WallboxDTO;
import de.hkwh.backend.model.*;
import de.hkwh.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class RessourceService {

    private final HubRepository hubs;
    private final ParkingSpotRepository parkingSpots;
    private final ModelRepository models;
    private final VehicleRepository vehicles;
    private final VehicleTicketRepository vehicleTickets;
    private final VehicleTaskRepository vehicleTasks;



    public WallboxDTO[] getWallboxes() {
        List<Parkingspot> wallboxList = parkingSpots.findWallboxes().orElseThrow();
        List<VehicleSchedulingDTO[]> scheduledVehicleArrays = createMockScheduling(wallboxList.size());
        WallboxDTO[] wallboxDTOs = new WallboxDTO[wallboxList.size()];

        for (int i = 0; i < wallboxDTOs.length; i++) {
            wallboxDTOs[i] = createWallboxDTO(wallboxList.get(i), scheduledVehicleArrays.get(i));
        }

        //@Todo include Scheduling Informationen to Wallbox

        return wallboxDTOs;
    }

    public VehicleDTO[] getVehicles() {
        var vehicleIterable = vehicles.findAll();
        List<Vehicle> vehicleList = StreamSupport.stream(vehicleIterable.spliterator(), true).toList();

        VehicleDTO[] vehicleDTOs = vehicleList.stream()
                .map(this::createVehicleDTO)
                .toArray(VehicleDTO[]::new);
        return vehicleDTOs;
    }

    public VehicleDTO getVehicle(String licensePlate){
        Vehicle vehicle = vehicles.findByLicensePlate(licensePlate).orElseThrow();
        return createVehicleDTO(vehicle);
    }
    public VehicleDTO getVehicle(long v_id){
        Vehicle vehicle = vehicles.findByV_id(v_id).orElseThrow();
        return createVehicleDTO(vehicle);
    }

    @Modifying
    public VehicleDTO checkIn(String licencePlate)
    {
        Vehicle vehicle = vehicles.findByLicensePlate(licencePlate).orElseThrow();
        Model model = models.findByM_id(vehicle.getM_id()).orElseThrow();
        Hub hub = hubs.findFirst().orElseThrow();
        Parkingspot parkingspot = parkingSpots.findFirstFree().orElseThrow();

        VehicleTicket ticket = new VehicleTicket(vehicle.getV_id(), hub.getH_id(), Timestamp.valueOf(LocalDateTime.now()), randomNextCustomer());

        vehicleTickets.updateActive(vehicle.getV_id());

        Random random = new Random();
        int minuets = random.nextInt(0, 60);
        int hours = random.nextInt(1,4);
        LocalDateTime time = LocalDateTime.now();
        time.plusHours(hours);
        time.plusMinutes(minuets);
        ticket.setCheckoutTimestamp(Timestamp.valueOf(time));

        ticket = vehicleTickets.save(ticket);

        return VehicleDTO.of(vehicle, model, ticket);
    }

    @Modifying
    public VehicleTicket checkOut(String licencePlate)
    {
        Vehicle vehicle = vehicles.findByLicensePlate(licencePlate).orElseThrow();
        VehicleTicket ticket = vehicleTickets.findByV_id(vehicle.getV_id()).orElseThrow();

        ticket.setCheckoutTimestamp(Timestamp.valueOf(LocalDateTime.now()));
        ticket.setIsActive(0);

        return vehicleTickets.save(ticket);
    }


    private VehicleDTO createVehicleDTO(Vehicle vehicle)
    {
        Model model = models.findByM_id(vehicle.getM_id()).orElseThrow();
        VehicleTicket ticket = vehicleTickets.findByV_id(vehicle.getV_id()).orElse(null);
        if (ticket == null) {
            return VehicleDTO.of(vehicle, model);
        }
        return VehicleDTO.of(vehicle, model, ticket);
    }

    private WallboxDTO createWallboxDTO(Parkingspot spot, VehicleSchedulingDTO[] schedulingVehicles)
    {
        Hub hub = hubs.findByH_id(spot.getH_id()).orElseThrow();
        return WallboxDTO.of(spot,hub, schedulingVehicles);
    }

    private List<VehicleSchedulingDTO[]> createMockScheduling(int amount) {
        ArrayList<VehicleSchedulingDTO[]> scheduledVehiclesList = new ArrayList<>();

        for (int i = 1 ; i <= amount ; i++) {
            List<Vehicle> vehicleList = vehicles.getRandom(i).orElseThrow();
            List<VehicleSchedulingDTO> scheduledVehicleDTOList = new ArrayList<>(vehicleList.stream()
                    .map(this::createMockVehicleSchedulingDTO)
                    .toList());

            scheduledVehicleDTOList.sort(Comparator.comparing(VehicleSchedulingDTO::queuePosition));

            VehicleSchedulingDTO[] scheduledVehicleDTOArray = scheduledVehicleDTOList.toArray(VehicleSchedulingDTO[]::new);
            scheduledVehiclesList.add(scheduledVehicleDTOArray);
        }

        return scheduledVehiclesList;
    }

    private VehicleSchedulingDTO createMockVehicleSchedulingDTO(Vehicle vehicle) {
        Random random = new Random();
        return VehicleSchedulingDTO.of(createVehicleDTO(vehicle), random.nextInt(0, 5));
    }

    private String randomNextCustomer() {
        Random random = new Random();
        String[] customerNames = new String[]{"Max Meier", "Sabine Müller", "Franz Schmid", "Josef Bauer" , "Alex Maier"};
        return customerNames[random.nextInt(0,5)];
    }
}
