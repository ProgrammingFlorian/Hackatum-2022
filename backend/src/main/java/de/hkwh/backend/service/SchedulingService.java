package de.hkwh.backend.service;

import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.model.VehicleScheduling;
import de.hkwh.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SchedulingService {

    private final HubRepository hubs;
    private final ParkingSpotRepository parkingSpots;
    private final VehicleRepository vehicles;
    private final VehicleTicketRepository vehicleTickets;
    private final VehicleTaskRepository vehicleTasks;
    private final VehicleSchedulingRepository vehicleScheduling;




    /*
     * Schedule
     * FindParkingspot
     * CreateTask
     * */

}
