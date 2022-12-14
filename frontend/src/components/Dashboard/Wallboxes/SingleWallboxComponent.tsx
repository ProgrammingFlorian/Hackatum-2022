import {WallboxDTO} from "../../../model/WallboxDTO";
import SingleWallboxVehicleComponent from "./SingleWallboxVehicleComponent";
import {VehicleInfoDTO} from "../../../model/VehicleInfoDTO";
import {VehicleScheduleDTO} from "../../../model/VehicleScheduleDTO";

interface SingleWallboxComponentProps {
    name: string;
    wallbox: WallboxDTO;

    showVehicleInfo: (vehicleInfo: VehicleInfoDTO) => void;
}

const SingleWallboxComponent = (props: SingleWallboxComponentProps) => {
    return (
        <div className="container text-white fw-bold pt-4 w-100">
            <h3>{props.name}</h3>
            {props.wallbox.vehicles_scheduled.sort((c1, c2) => c1.queuePosition - c2.queuePosition).map((vehicleSchedule: VehicleScheduleDTO) => {
                return (
                    <SingleWallboxVehicleComponent vehicle={vehicleSchedule.vehicle} showVehicleInfo={props.showVehicleInfo}/>
                )
            })}
        </div>
    )
};

export default SingleWallboxComponent;