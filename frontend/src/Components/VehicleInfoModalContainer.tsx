import { useState } from "react";
import { VehicleInfo } from "../Model/VehicleInfo";
import AutoInfoModal from "./VehicleInfoModal";

interface AutoInfoModalContainerProps {
    vehicleId: number;
}

const VehicleInfoModalContainer = (props: AutoInfoModalContainerProps) => {
    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>();

    async function checkInVehicle() {
        console.log("vehicle with id " + props.vehicleId + " is being checked in");
        const response = await fetch("/vehicle/check-in?id=" + props.vehicleId, {
            method: "POST",
        });
    }

    const getAndSetVehicleInfo = () => {
        // mock data for now
        const vehicleInfo: VehicleInfo = {
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
        }
        setVehicleInfo(vehicleInfo);
    }

    // checkInVehicle();
    // getAndSetVehicleInfo();

    return (
        <AutoInfoModal vehicleInfo={vehicleInfo!} />
    );

};

export default VehicleInfoModalContainer