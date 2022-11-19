import {VehicleInfo} from "../model/VehicleInfo";
import AutoInfoModal from "./VehicleInfoModal";

interface AutoInfoModalContainerProps {
    vehicleInfo: VehicleInfo;
}

const VehicleInfoModalContainer = (props: AutoInfoModalContainerProps) => {
    return (
        <AutoInfoModal vehicleInfo={props.vehicleInfo}/>
    );
};

export default VehicleInfoModalContainer;