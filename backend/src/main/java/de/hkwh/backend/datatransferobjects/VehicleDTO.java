package de.hkwh.backend.datatransferobjects;

import de.hkwh.backend.model.Model;
import de.hkwh.backend.model.Vehicle;
import de.hkwh.backend.model.VehicleTicket;

import java.sql.Timestamp;

public record VehicleDTO(
       long v_id,

       String vehicleClass,
       String brand,
       String model,
       String color,

       String licensePlate,

       int chargingSpeed,
       int batteryLevel,
       int batteryCapacity,

       Timestamp checkout_date,
       String nextCustomer

){

    public static VehicleDTO of(Vehicle vehicle, Model model, VehicleTicket ticket) {
        return new VehicleDTO(
                vehicle.getV_id(),
                model.getVehicleClass(),
                model.getBrand(),
                model.getModel(),
                vehicle.getColor(),
                vehicle.getLicensePlate(),
                model.getChargingSpeed(),
                vehicle.getBatteryLevel(),
                model.getBatteryCapacity(),
                ticket.getCheckoutTimestamp(),
                ticket.getNextCustomer()
        );
    }

    public static VehicleDTO of(Vehicle vehicle, Model model) {
        return new VehicleDTO(
                vehicle.getV_id(),
                model.getVehicleClass(),
                model.getBrand(),
                model.getModel(),
                vehicle.getColor(),
                vehicle.getLicensePlate(),
                model.getChargingSpeed(),
                vehicle.getBatteryLevel(),
                model.getBatteryCapacity(),
                null,
                "Not defined"
        );
    }
}
