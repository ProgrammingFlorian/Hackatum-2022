import DashboardInfoComponent from "./Info/DashboardInfoComponent";
import DashboardWallboxContainer from "./WallboxOverview/DashboardWallboxContainer";
import DashboardNotificationContainer from "./Notifications/DashboardNotificationContainer";
import {Wallbox} from "../Model/Wallbox";

interface DashboardComponentProps {
    wallboxes: Wallbox[];

    showVehicleInfo: (vehicleId: number) => void;
    hideVehicleInfo: () => void;
}

const DashboardComponent = (props: DashboardComponentProps) => {
    return (
        <div className="container-fluid dashboard-component h-100 p-0">
            <div className="container-fluid p-0">
                <DashboardInfoComponent/>
            </div>
            <div className="row justify-content-center m-0">
                <div className="container col-md-7">
                    <DashboardWallboxContainer wallboxes={props.wallboxes}/>
                </div>
                <div className="col-md-4" style={{borderLeft: "2px solid rgba(0, 0, 0, 0.15)"}}>
                    <div className="container">
                        <DashboardNotificationContainer/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardComponent;