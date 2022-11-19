package de.hkwh.backend.datatransferobjects;

import de.hkwh.backend.model.Hub;
import de.hkwh.backend.model.Parkingspot;

import javax.validation.constraints.NotBlank;

public record WallboxDTO(
        @NotBlank long p_id,
        @NotBlank long h_id,
        @NotBlank String spotName,
        @NotBlank boolean isFree,
        int chargingSpeed,
        VehicleSchedulingDTO[] vehicles_scheduled
) {
    public static WallboxDTO of(Parkingspot parkingspot, Hub hub, VehicleSchedulingDTO[] vehicles_scheduled)
    {
        return new WallboxDTO(
                parkingspot.getP_id(),
                hub.getH_id(),
                parkingspot.getSpotName(),
                parkingspot.getIsFree()==1,
                parkingspot.getChargingSpeed(),
                vehicles_scheduled
        );
    }
}
