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
     *  - BMW i4 -> being returned and will be picked up later -> live perform checkin
     *      -> will be among the first three
     *  - (potentially another one)
     * Parking Spaces:
     *  - many (15?) normal parking spaces
     *  - 3 with energy (-> wallboxes)
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
        Model eqa = new Model("Electric SUV", "Mercedes", "EQA", 112, 69);
        Model eTron = new Model("Electric sports car", "Audi", "e-Tron GT", 268, 93);
        Model i4 = new Model("Middle class", "BMW", "i4", 207, 84);

        eqa = models.save(eqa);
        eTron = models.save(eTron);
        i4 = models.save(i4);

        return new Model[]{eqa, eTron, i4};
    }

    private Vehicle[] setupVehicles(Model[] models) {
        Vehicle eqa1 = new Vehicle(models[0].getM_id(), "M SX 0001", 20, "red");
        Vehicle eqa2 = new Vehicle(models[0].getM_id(), "M SX 0002", 70, "white");
        Vehicle eTron1 = new Vehicle(models[1].getM_id(), "M SX 0003", 40, "blue");
        Vehicle i4_1 = new Vehicle(models[2].getM_id(), "M SX 0004", 90, "green");
        Vehicle i4_2 = new Vehicle(models[2].getM_id(), "M SX 0005", 10, "yellow");
        Vehicle i4_3 = new Vehicle(models[2].getM_id(), "M SX 0006", 35, "red");

        eqa1 = vehicles.save(eqa1);
        eqa2 = vehicles.save(eqa2);

        eTron1 = vehicles.save(eTron1);

        i4_1 = vehicles.save(i4_1);
        i4_2 = vehicles.save(i4_2);
        i4_3 = vehicles.save(i4_3);

        return new Vehicle[]{eqa1, eqa2, eTron1, i4_1, i4_2, i4_3};
    }

    private Hub setupHub() {
        return hubs.save(new Hub("München Flughafen", "Terminalstr. Mitte/MWZ, Mietwagenzentrum, 85356 München", "Ben Müller"));
    }

    private Parkingspot[] setupParkingSpots(Hub hub) {
        Parkingspot w1 = new Parkingspot(hub.getH_id(), "W1", true, true);
        Parkingspot w2 = new Parkingspot(hub.getH_id(), "W2", true, true);

        Parkingspot p1 = new Parkingspot(hub.getH_id(), "P1", false, true);
        Parkingspot p2 = new Parkingspot(hub.getH_id(), "P2", false, true);
        Parkingspot p3 = new Parkingspot(hub.getH_id(), "P3", false, true);
        Parkingspot p4 = new Parkingspot(hub.getH_id(), "P4", false, true);

        w1 = parkingSpots.save(w1);
        w2 = parkingSpots.save(w2);

        p1 = parkingSpots.save(p1);
        p2 = parkingSpots.save(p2);
        p3 = parkingSpots.save(p3);
        p4 = parkingSpots.save(p4);

        return new Parkingspot[]{w1, w2, p1, p2, p3, p4};
    }

    private VehicleTicket[] setupTickets(Vehicle[] vehicles, Hub hub, Parkingspot[] spots)
    {
        VehicleTicket t1 = new VehicleTicket(vehicles[0].getV_id(), hub.getH_id(), spots[0].getP_id(), Timestamp.valueOf(LocalDateTime.now()), Timestamp.valueOf(LocalDateTime.now().plusHours(3)), randomNextCustomer(), true);
        VehicleTicket t2 = new VehicleTicket(vehicles[2].getV_id(), hub.getH_id(), spots[1].getP_id(), Timestamp.valueOf(LocalDateTime.now()), Timestamp.valueOf(LocalDateTime.now().plusHours(2)), randomNextCustomer(), true);
        VehicleTicket t3 = new VehicleTicket(vehicles[1].getV_id(), hub.getH_id(), spots[2].getP_id(), Timestamp.valueOf(LocalDateTime.now()), Timestamp.valueOf(LocalDateTime.now().plusHours(2)), randomNextCustomer(), true);
        VehicleTicket t4 = new VehicleTicket(vehicles[4].getV_id(), hub.getH_id(), spots[3].getP_id(), Timestamp.valueOf(LocalDateTime.now()), Timestamp.valueOf(LocalDateTime.now().plusHours(1)), randomNextCustomer(), true);

        t1 = vehicleTickets.save(t1);
        t2 = vehicleTickets.save(t2);
        t3 = vehicleTickets.save(t3);
        t4 = vehicleTickets.save(t4);

        return new VehicleTicket[]{t1, t2, t3, t4};
    }

    private VehicleTask[] setupTasks(VehicleTicket[] tickets, Parkingspot[] spots)
    {
        VehicleTask ta1 = new VehicleTask(tickets[0].getVt_id(), "Move Vehicle", Timestamp.valueOf(LocalDateTime.now()), tickets[0].getP_id(), spots[4].getP_id(), false);
        VehicleTask ta2 = new VehicleTask(tickets[1].getVt_id(), "Move Vehicle", Timestamp.valueOf(LocalDateTime.now().plusHours(1)), tickets[1].getP_id(), spots[2].getP_id(), false);
        VehicleTask ta3 = new VehicleTask(tickets[2].getVt_id(), "Move Vehicle", Timestamp.valueOf(LocalDateTime.now().plusHours(1)), tickets[2].getP_id(), spots[1].getP_id(), false);
        VehicleTask ta4 = new VehicleTask(tickets[3].getVt_id(), "Move Vehicle", Timestamp.valueOf(LocalDateTime.now()), tickets[3].getP_id(), spots[0].getP_id(), false);

        ta1 = vehicleTasks.save(ta1);
        ta2 = vehicleTasks.save(ta2);
        ta3 = vehicleTasks.save(ta3);
        ta4 = vehicleTasks.save(ta4);

        return new VehicleTask[]{ta1, ta2, ta3, ta4};
    }

    private String randomNextCustomer() {
        Random random = new Random();
        String[] customerNames = new String[]{"Max Meier", "Sabine Müller", "Franz Schmid", "Josef Bauer" , "Alex Maier"};
        return customerNames[random.nextInt(0,5)];
    }
}
