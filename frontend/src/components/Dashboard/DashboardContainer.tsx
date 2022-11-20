import DashboardComponent from "./DashboardComponent";
import {useEffect, useState} from "react";
import {VehicleInfoDTO} from "../../model/VehicleInfoDTO";
import {Requests} from "../../common/requests";
import {apiDashboard, apiVehicleCheckinRoute} from "../../common/apiRoutes";
import {WallboxDTO} from "../../model/WallboxDTO";
import {LoadingComponent} from "../LoadingComponent";
import {DashboardDTO} from "../../model/DashboardDTO";
import {TaskDTO} from "../../model/TaskDTO";
import {useNavigate} from "react-router-dom";
import {dashboardVehicleInfoRoute} from "../../common/pageRoutes";

const DashboardContainer = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkinPlate = urlParams.get("plate");
    const vehicleInfoParam = urlParams.get("vehicle");

    const navigate = useNavigate();

    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfoDTO | null>(null);
    const [vehicleInfoTasks, setVehicleInfoTasks] = useState<TaskDTO[]>([]);
    const [wallboxes, setWallboxes] = useState<WallboxDTO[] | null>(null);
    const [tasks, setTasks] = useState<TaskDTO[]>([]);

    const loadWallboxes = (): Promise<void> => {
        return Requests.getRequest<DashboardDTO>(apiDashboard()).then((dashboard) => {
            setWallboxes(dashboard.wallboxes);
            setTasks(dashboard.tasks);

            return Promise.resolve();
        });
    };

    const showVehicleInfo = (vehicleInfo: VehicleInfoDTO) => {
        /*Requests.getRequest<VehicleInfoDTO>(apiVehicleInfoRoute(vehicleId)).then((vehicle) => {
            setVehicleInfo(vehicle)
        });*/
        setVehicleInfo(vehicleInfo);
        setVehicleInfoTasks(tasks.filter(task => task.v_id === vehicleInfo.v_id));
    }

    const hideVehicleInfo = () => {
        setVehicleInfo(null);
    }

    const getVehicleById = (vehicleId: number): (VehicleInfoDTO | null) => {
        if (wallboxes) {
            for (const wallbox of wallboxes) {
                for (const vehicleSchedule of wallbox.vehicles_scheduled) {
                    if (vehicleSchedule.vehicle.v_id === vehicleId) {
                        return vehicleSchedule.vehicle;
                    }
                }
            }
        }
        return null;
    }

    useEffect(() => {
        if (checkinPlate) {
            setTimeout(() => {
                Requests.postRequest<VehicleInfoDTO>(apiVehicleCheckinRoute(checkinPlate), {}).then(vehicle => {
                    loadWallboxes().then(() => {
                        navigate(dashboardVehicleInfoRoute(vehicle.v_id));
                    });
                });
            }, 2000);
        }
        loadWallboxes().then(() => {
            if (vehicleInfoParam) {
                let vehicleId = Number(vehicleInfoParam);
                let vehicle = getVehicleById(vehicleId);
                if (vehicle) {
                    showVehicleInfo(vehicle);
                }
            }
        });
    }, [checkinPlate]);

    if (wallboxes === null) {
        return LoadingComponent({
            message: "Loading..."
        });
    } else if (checkinPlate !== null) {
        return LoadingComponent({
            message: "Currently checking in your vehicle..."
        });
    } else {
        return (
            <DashboardComponent showVehicleInfo={showVehicleInfo} hideVehicleInfo={hideVehicleInfo}
                                wallboxes={wallboxes} tasks={tasks} vehicleInfo={vehicleInfo}
                                vehicleInfoTasks={vehicleInfoTasks}/>
        );
    }
}


export default DashboardContainer;