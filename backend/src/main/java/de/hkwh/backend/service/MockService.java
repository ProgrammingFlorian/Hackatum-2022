package de.hkwh.backend.service;

import de.hkwh.backend.model.*;
import de.hkwh.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Random;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class MockService {

    /**
     * Demo Szenario:
     * Cars:
     * - 9 vehicles; 7 of those have tickets (the last i4 and the last e-tron do not)
     * - User Story:
     * - BMW i4 -> being returned and will be picked up later -> live perform checkin
     * -> should be among the first three priority wise
     * - (potentially do another one)
     * Parking Spaces:
     * - 13 normal parking spaces
     * - 3 with energy (-> wallboxes)
     */

    private final HubRepository hubs;
    private final ParkingSpotRepository parkingSpots;
    private final ModelRepository models;
    private final VehicleRepository vehicles;
    private final VehicleTicketRepository vehicleTickets;
    private final VehicleTaskRepository vehicleTasks;
    private final VehicleSchedulingRepository vehicleScheduling;
    private final SchedulingService schedulingService;

    @PostConstruct
    public void setup() {
        clearDatabases();
        Model[] modelArray = setupModels();
        Vehicle[] vehicleArray = setupVehicles(modelArray);
        Hub hub = setupHub();
        Parkingspot[] parkingSpotArray = setupParkingSpots(hub);
        VehicleTicket[] ticketArray = setupTickets(vehicleArray, hub, parkingSpotArray);
        VehicleTask[] taskArray = setupTasks(ticketArray, parkingSpotArray);
        schedulingService.scheduleVehicleTickets();
    }

    private void clearDatabases() {
        hubs.deleteAll();
        parkingSpots.deleteAll();
        models.deleteAll();
        vehicles.deleteAll();
        vehicleTickets.deleteAll();
        vehicleTasks.deleteAll();
        vehicleScheduling.deleteAll();
    }

    private Model[] setupModels() {
        Model eqa = new Model("Electric SUV", "Mercedes", "EQA", 100, 70);
        Model eTron = new Model("Electric sports car", "Audi", "e-Tron GT", 150, 95);
        Model i4 = new Model("Middle class", "BMW", "i4", 130, 80);

        eqa = models.save(eqa);
        eTron = models.save(eTron);
        i4 = models.save(i4);

        return new Model[]{eqa, eTron, i4};
    }

    private Vehicle[] setupVehicles(Model[] models) {
        Vehicle eqa1 = new Vehicle(models[0].getM_id(), "M-SX-0001", 20, "red");
        Vehicle eqa2 = new Vehicle(models[0].getM_id(), "M-SX-0002", 60, "white");
        Vehicle eTron1 = new Vehicle(models[1].getM_id(), "M-SX-0003", 40, "blue");
        Vehicle eTron2 = new Vehicle(models[1].getM_id(), "M-SX-0004", 25, "black");
        Vehicle eTron3 = new Vehicle(models[2].getM_id(), "M-SX-0005", 5, "green"); // unticketed -> should have high priority
        Vehicle i4_1 = new Vehicle(models[2].getM_id(), "M-SX-0006", 30, "green");
        Vehicle i4_2 = new Vehicle(models[2].getM_id(), "M-SX-0007", 25, "yellow");
        Vehicle i4_3 = new Vehicle(models[2].getM_id(), "M-SX-0008", 35, "red");
        Vehicle i4_4 = new Vehicle(models[2].getM_id(), "M-SX-0009", 5, "blue"); // unticketed -> should have high priority

        eqa1 = vehicles.save(eqa1);
        eqa2 = vehicles.save(eqa2);
        eTron1 = vehicles.save(eTron1);
        eTron2 = vehicles.save(eTron2);
        i4_1 = vehicles.save(i4_1);
        i4_2 = vehicles.save(i4_2);
        i4_3 = vehicles.save(i4_3);

        // these two will not have any tickets
        eTron3 = vehicles.save(eTron3);
        i4_4 = vehicles.save(i4_4);

        return new Vehicle[]{eqa1, eqa2, eTron1, eTron2, i4_1, i4_2, i4_3, eTron3, i4_4};
    }

    private Hub setupHub() {
        return hubs.save(new Hub("München Flughafen", "Terminalstr. Mitte/MWZ, Mietwagenzentrum, 85356 München", "Ben Müller"));
    }

    private Parkingspot[] setupParkingSpots(Hub hub) {
        Parkingspot[] spots = new Parkingspot[13];
        for (int i = 0; i < 3; i++) {
            int baseChargingSpeed = 100;
            Parkingspot w = new Parkingspot(hub.getH_id(), "e-P" + (i + 1), true, baseChargingSpeed + i * 10, true);
            parkingSpots.save(w);
            spots[i] = w;
        }
        for (int i = 3; i < 13; i++) {
            Parkingspot p = new Parkingspot(hub.getH_id(), "P" + (i + 1), false, true);
            parkingSpots.save(p);
            spots[i] = p;
        }
        return spots;
    }

    private VehicleTicket[] setupTickets(Vehicle[] vehicles, Hub hub, Parkingspot[] spots) {
        VehicleTicket[] tickets = new VehicleTicket[vehicles.length];
        Timestamp checkinTime = Timestamp.valueOf(LocalDateTime.now().minusMinutes(15));
        Timestamp checkoutTime = Timestamp.valueOf(LocalDateTime.now().plusMinutes(60));
        for (int i = 0; i < vehicles.length - 2; i++) { // last two won't have tickets
            long randomTimeDelta = new Random().nextInt(1000 * 60 * 10);
            Timestamp nextCheckinTime = new Timestamp(checkinTime.getTime() + (i * 2 * 1000 * 60));
            Timestamp nextCheckoutTime = new Timestamp(checkoutTime.getTime() + randomTimeDelta);
            VehicleTicket ticket = new VehicleTicket(vehicles[i].getV_id(), hub.getH_id(), spots[i].getP_id(), nextCheckinTime, nextCheckoutTime, randomNextCustomer(), true);
            vehicleTickets.save(ticket);
            tickets[i] = ticket;
        }
        return tickets;
    }

    private VehicleTask[] setupTasks(VehicleTicket[] tickets, Parkingspot[] spots) {
        VehicleTask ta1 = new VehicleTask(tickets[0].getVt_id(), "Move Vehicle", Timestamp.valueOf(LocalDateTime.now()), tickets[0].getP_id(), spots[4].getP_id(), false);
        VehicleTask ta2 = new VehicleTask(tickets[1].getVt_id(), "Move Vehicle", Timestamp.valueOf(LocalDateTime.now().plusHours(1)), tickets[1].getP_id(), spots[2].getP_id(), false);
        VehicleTask ta3 = new VehicleTask(tickets[2].getVt_id(), "Move Vehicle", Timestamp.valueOf(LocalDateTime.now().plusMinutes(30)), tickets[2].getP_id(), spots[1].getP_id(), false);
        VehicleTask ta4 = new VehicleTask(tickets[3].getVt_id(), "Move Vehicle", Timestamp.valueOf(LocalDateTime.now().plusMinutes(10)), tickets[3].getP_id(), spots[0].getP_id(), false);

        ta1 = vehicleTasks.save(ta1);
        ta2 = vehicleTasks.save(ta2);
        ta3 = vehicleTasks.save(ta3);
        ta4 = vehicleTasks.save(ta4);

        return new VehicleTask[]{ta1, ta2, ta3, ta4};
    }

    private String randomNextCustomer() {
        Random random = new Random();
        String[] customerNames = new String[]{"Max Meier", "Sabine Müller", "Franz Schmid", "Josef Bauer", "Alex Maier"};
        return customerNames[random.nextInt(0, 5)];
    }
}
