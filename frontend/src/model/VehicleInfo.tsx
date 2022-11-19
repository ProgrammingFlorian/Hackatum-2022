import { Task } from "./Task";

/**
 * Data displayed on AutoInfoModal.
 */
export interface VehicleInfo {
    vehicleId: number;
    licensePlate: string;
    color: string;
    nextPickUpTime: Date;
    nextPickUpCustomer: Date;
    upcomingTasks: Task[];
    batteryLevel: number;
    brand: String;
}
