package de.hkwh.backend.datatransferobjects;

import javax.validation.constraints.NotBlank;

public record WallboxDTO(
        @NotBlank long p_id,
        @NotBlank long h_id,
        @NotBlank String spotName,
        @NotBlank boolean isFree,
        int chargingSpeed
) {
}
