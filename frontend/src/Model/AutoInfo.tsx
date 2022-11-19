/**
 * Data displayed on AutoInfoModal.
 */
export interface VehicleInfo {
    id: number;
    licensePlate: string;
    color: string;
    nextPickUpTime: Date;
    nextPickUpCustomer: Date;
    upcomingTasks: string[];
}
