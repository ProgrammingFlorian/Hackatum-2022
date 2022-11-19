package de.hkwh.backend.datatransferobjects;

import de.hkwh.backend.model.Model;
import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.repository.ModelRepository;

public record VehicleDTO(
       long v_id,
       String vehicleClass,
       String brand,
       String model,
       int chargingSpeed,
       String licensePlate,
       int batteryLevel
){

    public static VehicleDTO of(Vehicle vehicle, Model model) {
        return new VehicleDTO(
                vehicle.getV_id(),
                model.getVehicleClass(),
                model.getBrand(),
                model.getModel(),
                model.getChargingSpeed(),
                vehicle.getLicensePlate(),
                vehicle.getBatteryLevel()
        );
    }
}
