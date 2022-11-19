import {VehicleInfo} from "../Model/VehicleInfo";
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