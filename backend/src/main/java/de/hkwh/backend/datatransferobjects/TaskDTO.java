package de.hkwh.backend.datatransferobjects;

import de.hkwh.backend.model.*;

import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;

public record TaskDTO (
        long vta_id,
        long vt_id,
        long v_id,
        @NotBlank String licensePlate,
        @NotBlank String brand,
        @NotBlank String model,
        @NotBlank String vehicleClass,
        long from_p_id,
        String form_p_name,
        long to_p_id,
        String to_p_name,
        @NotBlank String taskName,
        Timestamp dateTime,
        boolean fulfilled
){
    public static TaskDTO of (VehicleTask task, VehicleTicket ticket, Vehicle vehicle, Model model, Parkingspot from, Parkingspot to){
        return new TaskDTO(
                task.getVta_id(),
                ticket.getVt_id(),
                vehicle.getV_id(),
                vehicle.getLicensePlate(),
                model.getBrand(),
                model.getModel(),
                model.getVehicleClass(),
                task.getFrom_p_id(),
                from.getSpotName(),
                task.getTo_p_id(),
                to.getSpotName(),
                task.getTaskName(),
                task.getDateTime(),
                task.getFulfilled()==1
        );
    }

    public static TaskDTO of (VehicleTask task, VehicleTicket ticket, Vehicle vehicle, Model model){
        return new TaskDTO(
                task.getVta_id(),
                ticket.getVt_id(),
                vehicle.getV_id(),
                vehicle.getLicensePlate(),
                model.getBrand(),
                model.getModel(),
                model.getVehicleClass(),
                task.getFrom_p_id(),
                "not defined",
                task.getTo_p_id(),
                "not defined",
                task.getTaskName(),
                task.getDateTime(),
                task.getFulfilled()==1
        );
    }
}
