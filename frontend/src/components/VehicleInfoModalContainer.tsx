import {VehicleInfoDTO} from "../model/VehicleInfoDTO";
import AutoInfoModal from "./VehicleInfoModal";

interface AutoInfoModalContainerProps {
    vehicleInfo: VehicleInfoDTO;
}

const VehicleInfoModalContainer = (props: AutoInfoModalContainerProps) => {
    return (
        <AutoInfoModal vehicleInfo={props.vehicleInfo}/>
    );
};

export default VehicleInfoModalContainer;