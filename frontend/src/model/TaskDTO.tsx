export interface TaskDTO {
    vtaId: number;
    ticketId: number;
    vehicle: number;

    licensePlate: string;
    vehicleClass: string;
    brand: string;
    model: string;

    fromPId: number;
    toPId: number;

    taskName: string;

    dateTime: Date;
}
