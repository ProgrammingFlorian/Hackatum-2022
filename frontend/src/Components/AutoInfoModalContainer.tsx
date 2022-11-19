import { useState } from "react";
import { VehicleInfo } from "../Model/AutoInfo";
import AutoInfoModal from "./AutoInfoModal";

interface AutoInfoModalContainerProps {
    id: number;
}

const AutoInfoModalContainer = (props: AutoInfoModalContainerProps) => {
    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>();

    const getVehicleInfo = () => {
        id: 0;
        licensePlate: "M-TU-1256";
        color: "yellow";
        nextPickUpTime: "2021-04-01 12:00";
    }

};

export default AutoInfoModalContainer