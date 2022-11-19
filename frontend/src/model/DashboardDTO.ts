import {TaskDTO} from "./TaskDTO";
import {WallboxDTO} from "./WallboxDTO";

export interface DashboardDTO {
    tasks: TaskDTO[];
    wallboxes: WallboxDTO[];
}