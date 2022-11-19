package de.hkwh.backend.datatransferobjects;

import de.hkwh.backend.model.Model;
import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.model.VehicleTicket;

import javax.validation.constraints.NotBlank;
import java.sql.Time;
import java.sql.Timestamp;

public record VehicleTicketDTO (
        @NotBlank long vt_id,
        @NotBlank long v_id,
        @NotBlank long h_id,
        @NotBlank String licensePlate,
        long p_id,
        Timestamp checkin_date,
        Timestamp checkout_date,
        boolean isActive
){
    public static VehicleTicketDTO of(VehicleTicket vehicleTicket, Vehicle vehicle) {
        return new VehicleTicketDTO(
                vehicleTicket.getVt_id(),
                vehicleTicket.getV_id(),
                vehicleTicket.getH_id(),
                vehicle.getLicensePlate(),
                vehicleTicket.getP_id(),
                vehicleTicket.getCheckinTimestamp(),
                vehicleTicket.getCheckoutTimestamp(),
                vehicleTicket.getIsActive() == 1
        );
    }

}
