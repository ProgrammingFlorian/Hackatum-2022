/**
 * Data displayed on AutoInfoModal.
 */
export interface VehicleInfoDTO {
    v_id: number;

    vehicleClass: string;
    brand: string;
    model: string;
    color: string;

    licensePlate: string;

    chargingStart: Date;
    chargingEnd: Date;
    chargingSpeed: number;
    batteryLevel: number;
    batteryCapacity: number;

    checkout_date: Date;
    nextCustomer: string;
}
