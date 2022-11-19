package de.hkwh.backend.datatransferobjects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

public record VehicleSchedulingDTO(
        @NotBlank long vs_id,
        @NotBlank long vt_id,
        @NotBlank long v_id,
        @NotBlank long p_id,
        @NotBlank long queuePosition,
        @NotBlank String licensePlate,
        @NotBlank int batteryLevel,
        @NotBlank Timestamp chargingStart,
        @NotBlank Timestamp chargingEnd
        ) {
}
