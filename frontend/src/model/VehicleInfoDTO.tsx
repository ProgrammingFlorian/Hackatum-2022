/**
 * Data displayed on AutoInfoModal.
 */
export interface VehicleInfoDTO {
    vehicleId: number;

    vehicleClass: string;
    brand: string;
    model: string;
    color: string;

    licensePlate: string;

    chargingSpeed: number;
    batteryLevel: number;

    nextPickUpTime: Date;
    nextPickUpCustomer: string;
}
