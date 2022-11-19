import SingleWallboxComponent from "./SingleWallboxComponent";
import {WallboxDTO} from "../../../model/WallboxDTO";
import {VehicleInfoDTO} from "../../../model/VehicleInfoDTO";

interface DashboardWallboxComponentProps {
    wallboxes: WallboxDTO[];

    showVehicleInfo: (vehicleInfo: VehicleInfoDTO) => void;
}

const DashboardWallboxComponent = (props: DashboardWallboxComponentProps) => {
    return (
        <div className="row align-items-start justify-content-center">
            {props.wallboxes.map((wallbox: WallboxDTO, index) => {
                return (<div className="col-auto">
                    <SingleWallboxComponent name={`Wallbox ${index}`} wallbox={wallbox}
                                            showVehicleInfo={props.showVehicleInfo}/>
                </div>);
            })}
        </div>
    )
};

export default DashboardWallboxComponent;