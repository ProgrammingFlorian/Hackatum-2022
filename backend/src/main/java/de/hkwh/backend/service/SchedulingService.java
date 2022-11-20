package de.hkwh.backend.service;

import de.hkwh.backend.datatransferobjects.TaskDTO;
import de.hkwh.backend.datatransferobjects.VehicleDTO;
import de.hkwh.backend.datatransferobjects.VehicleSchedulingDTO;
import de.hkwh.backend.datatransferobjects.WallboxDTO;
import de.hkwh.backend.model.*;
import de.hkwh.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SchedulingService {

    private final HubRepository hubs;
    private final ParkingSpotRepository parkingSpots;
    private final VehicleRepository vehicles;
    private final ModelRepository models;
    private final VehicleTicketRepository vehicleTickets;
    private final VehicleTaskRepository vehicleTasks;
    private final VehicleSchedulingRepository vehicleScheduling;


    /*
     * Schedule
     * FindParkingspot
     * CreateTask
     */
    public WallboxDTO[] getWallBoxes(){
        //scheduleVehicleTickets();
        List<Parkingspot> wallboxes = parkingSpots.findWallboxes().orElseThrow();
        List<WallboxDTO> wallboxDTOs = new ArrayList<>();
        for(Parkingspot wallbox: wallboxes){
            List<VehicleScheduling> scheduledVehicles = vehicleScheduling.getAllSchedulesByP_id(wallbox.getP_id()).orElseThrow();
            List<VehicleSchedulingDTO> vehicleSchedulingDTOs = new ArrayList<>();
            for(VehicleScheduling vs : scheduledVehicles) {
                vehicleSchedulingDTOs.add(createVehicleSchedulingDTO(vs));
            }
            vehicleSchedulingDTOs.sort(Comparator.comparing(VehicleSchedulingDTO::queuePosition));
            VehicleSchedulingDTO[] scheduledVehicleDTOArray = vehicleSchedulingDTOs.toArray(VehicleSchedulingDTO[]::new);
            wallboxDTOs.add(createWallboxDTO(wallbox,scheduledVehicleDTOArray));
        }
        wallboxDTOs.sort(Comparator.comparing(WallboxDTO::p_id));
        return wallboxDTOs.toArray(WallboxDTO[]::new);
    }

    /**
     * Schedules a collection of VehicleTickets and saves the ordering in
     * VehicleSchedulingRepository.
     * (Overwriting all old data)
     */
    public void scheduleVehicleTickets() {
        vehicleScheduling.deleteAll();
        List<Parkingspot> parkingSpots = new ArrayList<>();
        List<VehicleTicket> validVehicleTickets = new ArrayList<>(this.vehicleTickets.getAllValidTickets().orElseThrow());
        this.parkingSpots.findAll().forEach(parkingSpots::add);
        List<List<Object>> chargingSpotsFreeAt = initChargeSpotsFreeAtFromParkingSpots(parkingSpots);
        for (int i = 0; i < validVehicleTickets.size(); i++) {
            VehicleScheduling nextScheduling = scheduleNext(validVehicleTickets, chargingSpotsFreeAt, i);
            this.vehicleScheduling.save(nextScheduling);
            VehicleTask moveToChargerTask = createMoveToChargerTask(nextScheduling, validVehicleTickets);
            VehicleTask moveFromChargerTask = createMoveFromChargerTask(nextScheduling, validVehicleTickets);
            this.vehicleTasks.save(moveToChargerTask);
            this.vehicleTasks.save(moveFromChargerTask);
        }
        this.cleanAllCars();
    }

    private VehicleScheduling scheduleNext(List<VehicleTicket> vehicleTickets, List<List<Object>> chargingSpotsFreeAt, int queuePosition) {
        VehicleScheduling bestScheduling = null;
        double bestSchedulingValue = Integer.MIN_VALUE;
        for (VehicleTicket vehicleTicket : vehicleTickets) {
            for (List<Object> parkingSpotTuple : chargingSpotsFreeAt) {
                VehicleScheduling currentScheduling = getSchedulingForTicketAndSpot(vehicleTicket, parkingSpotTuple, queuePosition);
                double value = evaluateScheduling(currentScheduling, vehicleTicket);
                if (value > bestSchedulingValue) {
                    bestScheduling = currentScheduling;
                    bestSchedulingValue = value;
                }
            }
        }
        if (bestScheduling == null) {
            throw new RuntimeException("No scheduling possible");
        }
        occupyChargingSpot(chargingSpotsFreeAt, bestScheduling);
        return bestScheduling;
    }

    private void occupyChargingSpot(List<List<Object>> chargingSpotsFreeAt, VehicleScheduling scheduling) {
        long p_id = scheduling.getP_id();
        for (List<Object> parkingSpotTuple : chargingSpotsFreeAt) {
            if (((Parkingspot) parkingSpotTuple.get(0)).getP_id() == p_id) {
                parkingSpotTuple.set(1, scheduling.getChargingEnd());
            }
        }
    }

    private double evaluateScheduling(VehicleScheduling currentScheduling, VehicleTicket vehicleTicket) {
        double k = getCustomerPriority(currentScheduling);
        Timestamp checkoutTime = vehicleTicket.getCheckoutTimestamp();
        double l = currentScheduling.getChargeAtCheckout();
        return (1 / (1 + Math.exp(-(((1.0 / 7.0) * l) - 10)))) * k;
    }

    private double getCustomerPriority(VehicleScheduling currentScheduling) {
        // mocked for now; could be implemented once we have a user db
        return 1;
    }

    private VehicleScheduling getSchedulingForTicketAndSpot(VehicleTicket vehicleTicket, List<Object> chargingSpotFreeAt, int queuePosition) {
        long vehicleTicketId = vehicleTicket.getVt_id();
        long parkingSpotId = ((Parkingspot) chargingSpotFreeAt.get(0)).getP_id();
        Timestamp chargingStart = (Timestamp) chargingSpotFreeAt.get(1);
        int batteryCapacity = getBatteryCapacity(vehicleTicket);
        int batteryLevelStart = getCurrentBatteryLevel(vehicleTicket);
        int chargingSpeed = ((Parkingspot) chargingSpotFreeAt.get(0)).getChargingSpeed();
        Timestamp chargingEnd = new Timestamp(chargingStart.getTime() + calculateChargingDurationInMs(batteryCapacity, batteryLevelStart, chargingSpeed));
        Timestamp checkoutTime = vehicleTicket.getCheckoutTimestamp();
        int chargeAtCheckout = calculateChargeAtCheckout(batteryCapacity, batteryLevelStart, chargingSpeed, chargingStart, checkoutTime);
        return new VehicleScheduling(null, vehicleTicketId, parkingSpotId, queuePosition, chargingStart, chargingEnd, chargeAtCheckout, batteryLevelStart);
    }

    private int getCurrentBatteryLevel(VehicleTicket vehicleTicket) {
        Optional<Vehicle> vehicle = vehicles.findById(vehicleTicket.getV_id());
        return vehicle.map(Vehicle::getBatteryLevel).orElse(0);
    }

    private int getBatteryCapacity(VehicleTicket vehicleTicket) {
        long vehicleId = vehicleTicket.getV_id();
        Optional<Vehicle> vehicle = vehicles.findByV_id(vehicleId);
        if (vehicle.isPresent()) {
            long modelId = vehicle.get().getM_id();
            Optional<Model> model = models.findByM_id(modelId);
            if (model.isPresent()) {
                return model.get().getBatteryCapacity();
            }
        }
        return Model.DEFAULT_CAPACITY;
    }

    private void cleanAllCars() {
        // todo: implement
    }

    private VehicleTask createMoveFromChargerTask(VehicleScheduling nextScheduling, List<VehicleTicket> vehicleTickets) {
        long vehicleTicketId = nextScheduling.getVt_id();
        String taskName = VehicleTask.MOVE_VEHICLE_KEY;
        Timestamp dateTime = nextScheduling.getChargingEnd();
        long currentParkingSpotId = nextScheduling.getP_id();
        long targetParkingSpotId = vehicleTickets.stream().filter(vehicleTicket -> vehicleTicket.getVt_id() == vehicleTicketId).findFirst().get().getP_id();
        return new VehicleTask(null, vehicleTicketId, taskName, dateTime, currentParkingSpotId, targetParkingSpotId, 0);
    }

    private VehicleTask createMoveToChargerTask(VehicleScheduling nextScheduling, List<VehicleTicket> vehicleTickets) {
        long vehicleTicketId = nextScheduling.getVt_id();
        String taskName = VehicleTask.MOVE_VEHICLE_KEY;
        Timestamp dateTime = nextScheduling.getChargingStart();
        long currentParkingSpotId = vehicleTickets.stream().filter(vehicleTicket -> vehicleTicket.getVt_id() == vehicleTicketId).findFirst().get().getP_id();
        long targetParkingSpotId = nextScheduling.getP_id();
        return new VehicleTask(null, vehicleTicketId, taskName, dateTime, currentParkingSpotId, targetParkingSpotId, 0);
    }

    private List<List<Object>> initChargeSpotsFreeAtFromParkingSpots(List<Parkingspot> parkingSpots) {
        List<List<Object>> chargingSpotsFreeAt = new ArrayList<>();
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        for (Parkingspot parkingSpot : parkingSpots) {
            if (parkingSpot.getHasWallbox() != 0) {
                chargingSpotsFreeAt.add(Arrays.asList(parkingSpot, currentTime));
            }
        }
        return chargingSpotsFreeAt;
    }
    private static List<Object> findNextFreeParkingSpotTuple(List<List<Object>> chargingSpotsFreeAt) {
        return Collections.min(chargingSpotsFreeAt, Comparator.comparing(o -> ((Timestamp) o.get(0)).getTime()));
    }

    public TaskDTO[] getTasks() {

        List<VehicleTask> tasks = vehicleTasks.findAllUnFullFilled().orElseThrow();
        tasks.sort(Comparator.comparing(VehicleTask::getDateTime));
        TaskDTO[] tasksDTOs = tasks.stream()
                .map(e -> createTaskDTO(e))
                .toArray(TaskDTO[]::new);
        return tasksDTOs;
    }

    private static long getNextFreeChargingStart(List<List<Object>> chargingSpotsFreeAt) {
        return ((Timestamp) findNextFreeParkingSpotTuple(chargingSpotsFreeAt).get(0)).getTime();
    }

    @Modifying
    public TaskDTO fullFillTask(long vta_id){
        VehicleTask task = vehicleTasks.findByVta_id(vta_id).orElseThrow();
        task.setFulfilled(1);
        task = vehicleTasks.save(task);
        return createTaskDTO(task);
    }

    private TaskDTO createTaskDTO(VehicleTask task)
    {
        VehicleTicket ticket = vehicleTickets.findByVt_id(task.getVt_id()).orElseThrow();
        Vehicle vehicle = vehicles.findByV_id(ticket.getV_id()).orElseThrow();
        Model model =  models.findByM_id(vehicle.getM_id()).orElseThrow();
        Parkingspot from = parkingSpots.fincByP_id(task.getFrom_p_id()).orElseThrow();
        Parkingspot to = parkingSpots.fincByP_id(task.getTo_p_id()).orElseThrow();
        return TaskDTO.of(task, ticket, vehicle,model, from, to);
    }

    private static Parkingspot getNextFreeParkingSpot(List<List<Object>> chargingSpotsFreeAt) {
        return (Parkingspot) findNextFreeParkingSpotTuple(chargingSpotsFreeAt).get(1);
    }

    private static long calculateChargingDurationInMs(int batteryCapacity, int batteryLevelStart, int chargingSpeed) {
        return (long) ((batteryCapacity - batteryLevelStart) / (chargingSpeed)) * 60 * 60 * 1000;
    }


    private int calculateChargeAtCheckout(int batteryCapacity, int batteryLevelStart, int chargingSpeed, Timestamp chargingStart, Timestamp checkoutTime) {
        long chargingDurationInMs = calculateChargingDurationInMs(batteryCapacity, batteryLevelStart, chargingSpeed);
        double chargingDurationInMsUntilCheckout = checkoutTime.getTime() - chargingStart.getTime();
        if (chargingDurationInMsUntilCheckout < chargingDurationInMs) {
            return (int) (batteryLevelStart + (chargingDurationInMsUntilCheckout / 1000 / 60 / 60) * chargingSpeed);
        } else {
            return batteryCapacity;
        }
    }

    private VehicleSchedulingDTO createVehicleSchedulingDTO(VehicleScheduling vehicleScheduling)
    {
        VehicleTicket vehicleTicket = vehicleTickets.findByVt_id(vehicleScheduling.getVt_id()).orElseThrow();
        Vehicle vehicle = vehicles.findByV_id(vehicleTicket.getV_id()).orElseThrow();
        return VehicleSchedulingDTO.of(createVehicleDTO(vehicle, vehicleTicket), vehicleScheduling.getQueuePosition());
    }

    private VehicleDTO createVehicleDTO(Vehicle vehicle, VehicleTicket ticket)
    {
        Model model = models.findByM_id(vehicle.getM_id()).orElseThrow();
        return VehicleDTO.of(vehicle, model, ticket);
    }

    private WallboxDTO createWallboxDTO(Parkingspot spot, VehicleSchedulingDTO[] schedulingVehicles)
    {
        Hub hub = hubs.findByH_id(spot.getH_id()).orElseThrow();
        return WallboxDTO.of(spot,hub, schedulingVehicles);
    }
}
