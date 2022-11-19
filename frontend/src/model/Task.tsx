export interface Task {
    notificationId: number;
    vehicleId: number;
    type: string; // "clean" / "move"
    currentParkingSpot: number;
    nextParkingSpot: number | null;
}
