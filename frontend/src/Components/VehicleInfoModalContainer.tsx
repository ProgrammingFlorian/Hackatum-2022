import {useEffect, useState} from "react";
import { VehicleInfo } from "../Model/VehicleInfo";
import AutoInfoModal from "./VehicleInfoModal";
import {Requests} from "../common/requests";
import {apiVehicleInfoRoute} from "../common/apiRoutes";

interface AutoInfoModalContainerProps {
    vehicleId: number;
}

const VehicleInfoModalContainer = (props: AutoInfoModalContainerProps) => {
    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>();

    useEffect(() => {
        Requests.getRequest<VehicleInfo>(apiVehicleInfoRoute(props.vehicleId)).then((vehicle) => {
            setVehicleInfo(vehicle)
        })
    });

    // return vehicleInfo ? (
    //     <AutoInfoModal vehicleInfo={vehicleInfo} />
    // ) : <></>;
    return <AutoInfoModal vehicleInfo={{
        vehicleId: 0,
        licensePlate: "M-TU-1256",
        color: "yellow",
        nextPickUpTime: new Date("2021-05-01T12:00:00"),
        nextPickUpCustomer: new Date("2021-05-01T12:00:00"),
        upcomingTasks: [
            {
                notificationId: 0,
                vehicleId: 0,
                type: "clean",
                currentParkingSpot: 0,
                nextParkingSpot: null,
            },
            {
                notificationId: 0,
                vehicleId: 0,
                type: "move",
                currentParkingSpot: 0,
                nextParkingSpot: 1,
            }
        ]
    }} />

};

export default VehicleInfoModalContainer