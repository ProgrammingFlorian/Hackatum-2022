import {VehicleInfoDTO} from "./VehicleInfoDTO";

export interface VehicleScheduleDTO {
    queuePosition: number;
    vehicle: VehicleInfoDTO;
}