import DashboardWallboxComponent from "./DashboardWallboxComponent";
import {Wallbox} from "../../../model/Wallbox";
import {VehicleInfo} from "../../../model/VehicleInfo";

interface DashboardWallboxContainerProps {
    wallboxes: Wallbox[];

    showVehicleInfo: (vehicleInfo: VehicleInfo) => void;
}

const DashboardWallboxContainer = (props: DashboardWallboxContainerProps) => {
    return <DashboardWallboxComponent wallboxes={props.wallboxes} showVehicleInfo={props.showVehicleInfo}/>;
};

export default DashboardWallboxContainer;