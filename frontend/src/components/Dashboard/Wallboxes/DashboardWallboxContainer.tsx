import DashboardWallboxComponent from "./DashboardWallboxComponent";
import {Wallbox} from "../../../model/Wallbox";

interface DashboardWallboxContainerProps {
    wallboxes: Wallbox[];
}

const DashboardWallboxContainer = (props: DashboardWallboxContainerProps) => {
    return <DashboardWallboxComponent wallboxes={props.wallboxes}/>;
};

export default DashboardWallboxContainer;