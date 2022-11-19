import VehicleInfoComponent from "./VehicleInfoComponent";
import {VehicleInfoDTO} from "../../model/VehicleInfoDTO";
import {TaskDTO} from "../../model/TaskDTO";

interface VehicleInfoContainerProps {
    vehicle: VehicleInfoDTO;
    tasks: TaskDTO[];

    hideVehicleInfo: () => void;
}
const VehicleInfoContainer = (props: VehicleInfoContainerProps) => {

    return <VehicleInfoComponent vehicle={props.vehicle} tasks={props.tasks} hideVehicleInfo={props.hideVehicleInfo}/>
};

export default VehicleInfoContainer;