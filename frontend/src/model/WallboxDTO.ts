import {VehicleScheduleDTO} from "./VehicleScheduleDTO";

export interface WallboxDTO {
    p_id: number;
    h_id:  number;
    spotName: string;
    isFree: boolean;
    chargingSpeed: number
    vehicles_scheduled: VehicleScheduleDTO[];
}