import SingleVehicleComponent from "./SingleVehicleComponent";
import {VehicleInfoDTO} from "../model/VehicleInfoDTO";

interface VehiclePageComponentProps {
    vehicles?: VehicleInfoDTO[];
}

const VehiclePageComponent = (props: VehiclePageComponentProps) => {
    return (
        <div>
            <div className="row align-items-center justify-content-center dashboard-component h-100">
                {props.vehicles?.map((vehicle: VehicleInfoDTO) => {
                    return (<div className="col-8 py-2 ">
                        <SingleVehicleComponent vehicle={vehicle}/>
                    </div>);
                })}
            </div>
        </div>
    )
};

export default VehiclePageComponent;