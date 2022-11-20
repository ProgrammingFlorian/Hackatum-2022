package de.hkwh.backend.service;

import de.hkwh.backend.datatransferobjects.TaskDTO;
import de.hkwh.backend.model.*;
import de.hkwh.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

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





    public TaskDTO[] getTasks() {

        List<VehicleTask> tasks = vehicleTasks.findAllUnFullFilled().orElseThrow();
        tasks.sort(Comparator.comparing(VehicleTask::getDateTime));
        TaskDTO[] tasksDTOs = tasks.stream()
                .map(e -> createTaskDTO(e))
                .toArray(TaskDTO[]::new);
        return tasksDTOs;
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
}
