package de.hkwh.backend.datatransferobjects;

import javax.validation.constraints.NotBlank;

public record VehicleSchedulingDTO(
        @NotBlank int queuePosition,
        VehicleDTO vehicle
        )
{
        public static VehicleSchedulingDTO of (VehicleDTO vehicle, int queuePosition)
        {
                return new VehicleSchedulingDTO(queuePosition, vehicle);
        }
}
