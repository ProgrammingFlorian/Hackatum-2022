export interface TaskDTO {
    vta_id: number;
    vt_id: number;
    v_id: number;

    licensePlate: string;
    brand: string;
    model: string;
    vehicleClass: string;

    from_p_id: number;
    from_p_name: string;
    to_p_id: number;
    to_p_name: string;
    taskName: string;

    dateTime: Date;
    fulfilled: boolean;
}
