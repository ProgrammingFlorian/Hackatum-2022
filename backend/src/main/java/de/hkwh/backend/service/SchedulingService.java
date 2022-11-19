package de.hkwh.backend.service;

import de.hkwh.backend.model.*;
import de.hkwh.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class SchedulingService {

    private final HubRepository hubs;
    private final ParkingSpotRepository parkingSpots;
    private final VehicleRepository vehicles;
    private final VehicleTicketRepository vehicleTickets;
    private final VehicleTaskRepository vehicleTasks;
    private final VehicleSchedulingRepository vehicleScheduling;
    private final ModelRepository models;

    /*
     * Schedule
     * FindParkingspot
     * CreateTask
     */

    /**
     * Schedules a collection of VehicleTickets and saves the ordering in
     * VehicleSchedulingRepository.
     * (Overwriting all old data)
     */
    public void scheduleVehicleTickets() {
        List<VehicleTicket> vehicleTickets = new ArrayList<>();
        List<Parkingspot> parkingSpots = new ArrayList<>();
        List<Model> models = new ArrayList<>();
        this.vehicleTickets.findAll().forEach(vehicleTickets::add);
        this.parkingSpots.findAll().forEach(parkingSpots::add);
        this.models.findAll().forEach(models::add);
        List<List<Object>> chargingSpotsFreeAt = initChargeSpotsFreeAt(parkingSpots);
        for (int i = 0; i < vehicleTickets.size(); i++) {
            VehicleScheduling nextScheduling = scheduleNext(vehicleTickets, chargingSpotsFreeAt, models, i);
            VehicleTask moveToChargerTask = createMoveToChargerTask(nextScheduling, vehicleTickets);
            VehicleTask moveFromChargerTask = createMoveFromChargerTask(nextScheduling, vehicleTickets);
            this.vehicleScheduling.save(nextScheduling);
            this.vehicleTasks.save(moveToChargerTask);
            this.vehicleTasks.save(moveFromChargerTask);
        }
        vehicleScheduling.deleteAll();
        this.cleanAllCars();
    }

    private VehicleScheduling scheduleNext(List<VehicleTicket> vehicleTickets, List<List<Object>> chargingSpotsFreeAt, int queuePosition) {
        VehicleScheduling bestScheduling = null;
        int bestSchedulingValue = 0;
        for (VehicleTicket vehicleTicket : vehicleTickets) {
            for (List<Object> parkingSpotTuple : chargingSpotsFreeAt) {
                VehicleScheduling currentScheduling = getSchedulingForTicketAndSpot(vehicleTicket, parkingSpotTuple, queuePosition);
                int value = evaluateScheduling(currentScheduling);
                if (value > bestSchedulingValue) {
                    bestScheduling = currentScheduling;
                    bestSchedulingValue = value;
                }
            }
        }
        occupyChargingSpot(chargingSpotsFreeAt, bestScheduling);
        return bestScheduling;
    }

    private void occupyChargingSpot(List<List<Object>> chargingSpotsFreeAt, VehicleScheduling scheduling) {
        long p_id = scheduling.getP_id();
        for (List<Object> parkingSpotTuple : chargingSpotsFreeAt) {
            if (((Parkingspot)parkingSpotTuple.get(0)).getP_id() == p_id) {
                parkingSpotTuple.set(1, scheduling.getChargingEnd());
            }
        }
    }

    private int evaluateScheduling(VehicleScheduling currentScheduling) {
        return 0; // todo: implement
    }

    private VehicleScheduling getSchedulingForTicketAndSpot(VehicleTicket vehicleTicket, List<Object> chargingSpotFreeAt, int queuePosition) {
        long vehicleTaskId = vehicleTicket.getVt_id();
        long parkingSpotId = ((Parkingspot)chargingSpotFreeAt.get(0)).getP_id();
        Timestamp chargingStart = (Timestamp)chargingSpotFreeAt.get(1);
        int batteryCapacity = vehicleTicket.getVehicle().getModel().getBatteryCapacity();
        int
        Timestamp chargingEnd = new Timestamp(chargingStart.getTime() + calculateChargingDurationInMs());
        // todo: implement
    }

    private void cleanAllCars() {
    }

    private VehicleTask createMoveFromChargerTask(VehicleScheduling nextScheduling, List<VehicleTicket> vehicleTickets) {
        return null; // todo: implement
    }

    private VehicleTask createMoveToChargerTask(VehicleScheduling nextScheduling, List<VehicleTicket> vehicleTickets) {
        return null; // todo: implement
    }

    private List<List<Object>> initChargeSpotsFreeAt(List<Parkingspot> parkingSpots) {
        return null; // todo: initialize the list with tuples: first elements are the parking spots and second the time when they will be free (-> currentTime for all)
    }

    private static List<Object> findNextFreeParkingSpotTuple(List<List<Object>> chargingSpotsFreeAt) {
        return Collections.min(chargingSpotsFreeAt, Comparator.comparing(o -> ((Timestamp) o.get(0)).getTime()));
    }

    private static long getNextFreeChargingStart(List<List<Object>> chargingSpotsFreeAt) {
        return ((Timestamp) findNextFreeParkingSpotTuple(chargingSpotsFreeAt).get(0)).getTime();
    }

    private static Parkingspot getNextFreeParkingSpot(List<List<Object>> chargingSpotsFreeAt) {
        return (Parkingspot) findNextFreeParkingSpotTuple(chargingSpotsFreeAt).get(1);
    }

    private static long calculateChargingDurationInMs(int batteryCapacity, int batteryLevelStart, int chargingSpeed) {
        return 1000 * 60 * 60; // todo: implement if enough time
    }

    private int countChargingParkingSpots(Collection<Parkingspot> parkingSpots) {
        int chargingParkingSpots = 0;
        for (Parkingspot parkingSpot : parkingSpots) {
            chargingParkingSpots += parkingSpot.getHasWallbox();
        }
        return chargingParkingSpots;
    }
}
