package de.hkwh.backend.datatransferobjects;

import de.hkwh.backend.model.Model;
import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.model.VehicleTask;
import de.hkwh.backend.model.VehicleTicket;

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
        long to_p_id,
        @NotBlank String taskName,
        Timestamp dateTime,
        boolean fulfilled
){
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
                task.getTo_p_id(),
                task.getTaskName(),
                task.getDateTime(),
                task.getFulfilled()==1
        );
    }
}
