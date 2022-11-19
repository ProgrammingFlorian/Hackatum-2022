import DashboardWelcomeComponent from "./Welcome/DashboardWelcomeComponent";
import DashboardWallboxContainer from "./Wallboxes/DashboardWallboxContainer";
import DashboardNotificationContainer from "./Notifications/DashboardNotificationContainer";
import {WallboxDTO} from "../../model/WallboxDTO";
import {VehicleInfoDTO} from "../../model/VehicleInfoDTO";
import VehicleInfoContainer from "../VehicleInformation/VehicleInfoContainer";

interface DashboardComponentProps {
    wallboxes: WallboxDTO[];
    vehicleInfo: VehicleInfoDTO | null;

    showVehicleInfo: (vehicleInfo: VehicleInfoDTO) => void;
    hideVehicleInfo: () => void;
}

const DashboardComponent = (props: DashboardComponentProps) => {
    return (
        <>
            <div className="container-fluid dashboard-component h-100 p-0">
                <div className="container-fluid p-0">
                    <DashboardWelcomeComponent/>
                </div>
                <div className="row justify-content-center m-0">
                    <div className="container col-md-7">
                        <DashboardWallboxContainer wallboxes={props.wallboxes} showVehicleInfo={props.showVehicleInfo}/>
                    </div>
                    <div className="col-md-4" style={{borderLeft: "2px solid rgba(0, 0, 0, 0.15)"}}>
                        <div className="container">
                            <DashboardNotificationContainer/>
                        </div>
                    </div>
                </div>
            </div>
            {props.vehicleInfo !== null ?
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-opacity-95 bg-dark"
                     style={{zIndex: "20"}}>
                    <div className="d-flex justify-content-center align-items-center h-100 pt-3">
                        <div className="mt-5">
                            <VehicleInfoContainer/>
                        </div>
                    </div>
                </div>
            : <></>}
        </>
    );
};

export default DashboardComponent;