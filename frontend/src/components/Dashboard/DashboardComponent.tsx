import DashboardWelcomeComponent from "./Welcome/DashboardWelcomeComponent";
import DashboardWallboxContainer from "./Wallboxes/DashboardWallboxContainer";
import DashboardNotificationContainer from "./Notifications/DashboardNotificationContainer";
import {Wallbox} from "../../model/Wallbox";
import {VehicleInfo} from "../../model/VehicleInfo";
import VehicleInfoContainer from "../VehicleInformation/VehicleInfoContainer";

interface DashboardComponentProps {
    wallboxes: Wallbox[];
    vehicleInfo: VehicleInfo | null;

    showVehicleInfo: (vehicleInfo: VehicleInfo) => void;
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
                        <h3 className="text-white fw-bold pt-4">
                           Notifications:
                        </h3>
                        <div className="container">
                            <DashboardNotificationContainer/>
                        </div>
                    </div>
                </div>
            </div>
            {props.vehicleInfo !== null ?

                <div className=" position-absolute top-0 start-0 w-100 h-auto bg-opacity-95 bg-dark"
                     style={{zIndex: "20"}}>
                    <br/> <br/> <br/> <br/> <br/>
                    <div className="d-flex justify-content-center align-items-center pb-5">
                        <div className="">
                            <VehicleInfoContainer hideVehicleInfo={props.hideVehicleInfo}/>
                        </div>
                    </div>
                </div>
            : <></>}
        </>
    );
};

export default DashboardComponent;