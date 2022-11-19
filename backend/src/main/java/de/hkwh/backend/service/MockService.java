package de.hkwh.backend.service;

import de.hkwh.backend.model.Hub;
import de.hkwh.backend.model.Model;
import de.hkwh.backend.model.Parkingspot;
import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class MockService {

    private final HubRepository hubs;
    private final ParkingSpotRepository parkingSpots;
    private final ModelRepository models;
    private final VehicleRepository vehicles;
    private final VehicleTicketRepository vehicleTickets;
    private final VehicleTaskRepository vehicleTasks;
    private final VehicleSchedulingRepository vehicleScheduling;

    @PostConstruct
    public void setup() {
        clearDatabases();
        Model[] modelArray = setupModels();
        Vehicle[] vehicleArray = setupVehicles(modelArray);
        Hub hub = setupHub();
        Parkingspot[] parkingSpotArray = setupParkingSpots(hub);
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
        Model eqa = new Model("Electric SUV", "Mercedes", "EQA", 112);
        Model eTron = new Model("Electric sports car", "Audi", "e-Tron GT", 268);
        Model i4 = new Model("Middle class", "BMW", "i4", 207);

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


}
