import DashboardWallboxComponent from "./DashboardWallboxComponent";
import {WallboxDTO} from "../../../model/WallboxDTO";
import {VehicleInfoDTO} from "../../../model/VehicleInfoDTO";

interface DashboardWallboxContainerProps {
    wallboxes: WallboxDTO[];

    showVehicleInfo: (vehicleInfo: VehicleInfoDTO) => void;
}

const DashboardWallboxContainer = (props: DashboardWallboxContainerProps) => {
    return <DashboardWallboxComponent wallboxes={props.wallboxes} showVehicleInfo={props.showVehicleInfo}/>;
};

export default DashboardWallboxContainer;