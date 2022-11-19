package de.hkwh.backend.service;

import de.hkwh.backend.datatransferobjects.VehicleDTO;
import de.hkwh.backend.datatransferobjects.VehicleTicketDTO;
import de.hkwh.backend.model.*;
import de.hkwh.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final HubRepository hubs;
    private final ParkingSpotRepository parkingSpots;
    private final ModelRepository models;
    private final VehicleRepository vehicles;
    private final VehicleTicketRepository vehicleTickets;
    private final VehicleTaskRepository vehicleTasks;



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
    /*
    * x  CheckIn
    * x  CheckOut
    * CreateTask
    * VehicleInformation
    * CreateVehicle
    *
    * */
    @Modifying
    public VehicleTicketDTO checkIn(String licencePlate, long h_id)
    {
        Vehicle vehicle = vehicles.findByLicensePlate(licencePlate).orElseThrow();
        //Hub hub = hubs.findByHubName(hubName).orElseThrow();
        Hub hub = hubs.findByH_id(h_id).orElseThrow();
        Parkingspot parkingspot = parkingSpots.findFirstFree().orElseThrow();

        VehicleTicket ticket = new VehicleTicket(vehicle.getV_id(), hub.getH_id(), Timestamp.valueOf(LocalDateTime.now()), randomNextCustomer());

        //@Todo ticket.setCheckoutTimestamp();

        ticket = vehicleTickets.save(ticket);

        return VehicleTicketDTO.of(ticket, vehicle);
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
        return VehicleDTO.of(vehicle, model);
    }

    private String randomNextCustomer() {
        Random random = new Random();
        String[] customerNames = new String[]{"Max Meier", "Sabine Müller", "Franz Schmid", "Josef Bauer" , "Alex Maier"};
        return customerNames[random.nextInt(0,5)];
    }
}
