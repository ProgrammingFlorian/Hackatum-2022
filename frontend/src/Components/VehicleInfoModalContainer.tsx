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

    return vehicleInfo ? (
        <AutoInfoModal vehicleInfo={vehicleInfo} />
    ) : <></>;

};

export default VehicleInfoModalContainer