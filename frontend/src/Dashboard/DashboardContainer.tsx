import DashboardComponent from "../Dashboard/DashboardComponent";
import {useEffect, useState} from "react";
import {VehicleInfo} from "../Model/VehicleInfo";
import {Requests} from "../common/requests";
import {apiVehicleCheckinRoute, apiVehicleInfoRoute} from "../common/apiRoutes";
import {SuccessDTO} from "../Model/SuccessDTO";
import {Wallbox} from "../Model/Wallbox";
import {LoadingComponent} from "../Components/LoadingComponent";

const DashboardContainer = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkin = urlParams.get("checkin");

    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
    const [wallboxes, setWallboxes] = useState<Wallbox[] | null>(null);

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
                        batteryLevel: 20
                    },
                    {
                        vehicleId: 4,
                        color: 'red',
                        licensePlate: 'M SX 0001',
                        nextPickUpCustomer: new Date(),
                        upcomingTasks: [],
                        nextPickUpTime: new Date(),
                        batteryLevel: 20
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
                        batteryLevel: 20
                    }
                ]
            }
        ]);
    };

    const showVehicleInfo = (vehicleId: number) => {
        Requests.getRequest<VehicleInfo>(apiVehicleInfoRoute(vehicleId)).then((vehicle) => {
            setVehicleInfo(vehicle)
        });
    }

    const hideVehicleInfo = () => {
        setVehicleInfo(null);
    }

    useEffect(() => {
        if (checkin) {
            const vehicleId = Number(checkin);
            Requests.postRequest<SuccessDTO>(apiVehicleCheckinRoute(vehicleId), {}).then(success => {
                if (success.success) {
                    showVehicleInfo(vehicleId);
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
    } else if (vehicleInfo !== null) {
        return LoadingComponent({
            message: "Currently checking in your vehicle..."
        });
    } else {
        return (
            <DashboardComponent showVehicleInfo={showVehicleInfo} hideVehicleInfo={hideVehicleInfo}
                                wallboxes={wallboxes}/>
        );
    }
}


export default DashboardContainer;