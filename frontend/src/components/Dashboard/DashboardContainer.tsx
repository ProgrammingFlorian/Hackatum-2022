import DashboardComponent from "./DashboardComponent";
import {useEffect, useState} from "react";
import {VehicleInfoDTO} from "../../model/VehicleInfoDTO";
import {Requests} from "../../common/requests";
import {apiDashboard, apiVehicleCheckinRoute, apiVehicleInfoRoute} from "../../common/apiRoutes";
import {SuccessDTO} from "../../model/SuccessDTO";
import {WallboxDTO} from "../../model/WallboxDTO";
import {LoadingComponent} from "../LoadingComponent";
import {DashboardDTO} from "../../model/DashboardDTO";
import {TaskDTO} from "../../model/TaskDTO";

const DashboardContainer = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkin = urlParams.get("checkin");

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
        setVehicleInfoTasks(tasks.filter(task => task.vehicle === vehicleInfo.vehicleId));
    }

    const hideVehicleInfo = () => {
        setVehicleInfo(null);
    }

    const getVehicleById = (vehicleId: number): (VehicleInfoDTO | null) => {
        if (wallboxes) {
            for (const wallbox of wallboxes) {
                for (const vehicleSchedule of wallbox.vehicles) {
                    if (vehicleSchedule.vehicle.vehicleId === vehicleId) {
                        return vehicleSchedule.vehicle;
                    }
                }
            }
        }
        return null;
    }

    useEffect(() => {
        if (checkin) {
            const vehicleId = Number(checkin);
            Requests.postRequest<SuccessDTO>(apiVehicleCheckinRoute(vehicleId), {}).then(success => {
                if (success.vehicleId) {
                    loadWallboxes().then(() => {
                        const vehicle = getVehicleById(vehicleId);
                        if (vehicle !== null) {
                            showVehicleInfo(vehicle);
                        }
                    });
                } else {
                    console.log("Checkin failed!");
                }
            });
        }
        loadWallboxes();
    });

    if (wallboxes === null) {
        return LoadingComponent({
            message: "Lade..."
        });
    } else if (checkin !== null) {
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