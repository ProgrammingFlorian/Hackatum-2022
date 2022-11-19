import DashboardComponent from "./DashboardComponent";
import {useEffect, useState} from "react";
import {VehicleInfoDTO} from "../../model/VehicleInfoDTO";
import {Requests} from "../../common/requests";
import {apiVehicleCheckinRoute, apiVehicleInfoRoute} from "../../common/apiRoutes";
import {SuccessDTO} from "../../model/SuccessDTO";
import {WallboxDTO} from "../../model/WallboxDTO";
import {LoadingComponent} from "../LoadingComponent";

const DashboardContainer = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkin = urlParams.get("checkin");

    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfoDTO | null>(null);
    const [wallboxes, setWallboxes] = useState<WallboxDTO[] | null>(null);

    const loadWallboxes = () => {
        // TODO
        setWallboxes([
            {
                vehicles: [
                    {
                        vehicleId: 4,
                        color: 'red',
                        licensePlate: 'M SX 0001',
                        nextPickUpCustomer: new Date(),
                        upcomingTasks: [],
                        nextPickUpTime: new Date(),
                        batteryLevel: 20,
                        brand: "Audi"
                    },
                    {
                        vehicleId: 4,
                        color: 'red',
                        licensePlate: 'M SX 0001',
                        nextPickUpCustomer: new Date(),
                        upcomingTasks: [],
                        nextPickUpTime: new Date(),
                        batteryLevel: 50,
                        brand: "Audi"
                    }
                ]
            },
            {
                vehicles: [
                    {
                        vehicleId: 4,
                        color: 'red',
                        licensePlate: 'M SX 0001',
                        nextPickUpCustomer: new Date(),
                        upcomingTasks: [],
                        nextPickUpTime: new Date(),
                        batteryLevel: 20,
                        brand: "Audi"
                    }
                ]
            }
        ]);
    };

    const showVehicleInfo = (vehicleInfo: VehicleInfoDTO) => {
        /*Requests.getRequest<VehicleInfoDTO>(apiVehicleInfoRoute(vehicleId)).then((vehicle) => {
            setVehicleInfo(vehicle)
        });*/
        setVehicleInfo(vehicleInfo);
    }

    const hideVehicleInfo = () => {

        setVehicleInfo(null);
    }

    useEffect(() => {
        if (checkin) {
            const vehicleId = Number(checkin);
            Requests.postRequest<SuccessDTO>(apiVehicleCheckinRoute(vehicleId), {}).then(success => {
                if (success.success) {
                    //showVehicleInfo(vehicleId);
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
                                wallboxes={wallboxes} vehicleInfo={vehicleInfo}/>
        );
    }
}


export default DashboardContainer;