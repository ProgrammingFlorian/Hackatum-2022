import DashboardWelcomeComponent from "./Welcome/DashboardWelcomeComponent";
import DashboardWallboxContainer from "./Wallboxes/DashboardWallboxContainer";
import DashboardTaskContainer from "./Tasks/DashboardTaskContainer";
import {WallboxDTO} from "../../model/WallboxDTO";
import {VehicleInfoDTO} from "../../model/VehicleInfoDTO";
import VehicleInfoContainer from "../VehicleInformation/VehicleInfoContainer";
import {TaskDTO} from "../../model/TaskDTO";

interface DashboardComponentProps {
    wallboxes: WallboxDTO[];
    tasks: TaskDTO[];
    vehicleInfo: VehicleInfoDTO | null;
    vehicleInfoTasks: TaskDTO[];

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
                <div className="row justify-content-evenly m-0">
                    <div className="container col-md-8  justify-content-center">
                        <DashboardWallboxContainer wallboxes={props.wallboxes} showVehicleInfo={props.showVehicleInfo}/>
                    </div>
                    <div className="col-md-3" style={{borderLeft: "2px solid rgba(0, 0, 0, 0.15)"}}>
                        <h3 className="text-white fw-bold pt-4 mx-3">
                           Notifications:
                        </h3>
                        <div className="container">
                            <DashboardTaskContainer tasks={props.tasks}/>
                        </div>
                    </div>
                </div>
            </div>
            {props.vehicleInfo !== null ?

                <div className=" position-absolute top-0 start-0 w-100 bg-opacity-95 bg-dark"
                     style={{zIndex: "20", height: "10000px"}}>
                    <br/> <br/> <br/> <br/> <br/>
                    <div className="d-flex justify-content-center align-items-center pb-5">
                        <div className="">
                            <VehicleInfoContainer vehicle={props.vehicleInfo} tasks={props.vehicleInfoTasks} hideVehicleInfo={props.hideVehicleInfo}/>
                        </div>
                    </div>
                </div>
            : <></>}
        </>
    );
};

export default DashboardComponent;