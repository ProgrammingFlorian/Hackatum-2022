import SingleWallboxComponent from "./SingleWallboxComponent";
import {Wallbox} from "../../../model/Wallbox";
import {VehicleInfo} from "../../../model/VehicleInfo";

interface DashboardWallboxComponentProps {
    wallboxes: Wallbox[];

    showVehicleInfo: (vehicleInfo: VehicleInfo) => void;
}

const DashboardWallboxComponent = (props: DashboardWallboxComponentProps) => {
    return (
        <div className="row align-items-start">
            {props.wallboxes.map((wallbox: Wallbox, index) => {
                return (<div className="col-auto">
                    <SingleWallboxComponent name={`Wallbox ${index}`} wallbox={wallbox}
                                            showVehicleInfo={props.showVehicleInfo}/>
                </div>);
            })}
        </div>
    )
};

export default DashboardWallboxComponent;