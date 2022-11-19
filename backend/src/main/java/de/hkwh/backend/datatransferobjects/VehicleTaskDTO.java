package de.hkwh.backend.datatransferobjects;
import javax.validation.constraints.NotBlank;

import java.sql.Timestamp;

public record VehicleTaskDTO(
        @NotBlank long vta_id,
        @NotBlank long vt_id,
        @NotBlank long v_id,
        @NotBlank String licensePlate,
        @NotBlank String taskName,
        Timestamp dateTime,
        long from_p_id,
        long to_p_id,
        boolean fulfilled
) {
}
