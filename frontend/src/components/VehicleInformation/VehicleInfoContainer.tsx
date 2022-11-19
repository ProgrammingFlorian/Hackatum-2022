import VehicleInfoComponent from "./VehicleInfoComponent";



interface VehicleInfoContainerProps {
    hideVehicleInfo: () => void;
}
const VehicleInfoContainer = (props: VehicleInfoContainerProps) => {

    return <VehicleInfoComponent hideVehicleInfo={props.hideVehicleInfo}/>
};

export default VehicleInfoContainer;