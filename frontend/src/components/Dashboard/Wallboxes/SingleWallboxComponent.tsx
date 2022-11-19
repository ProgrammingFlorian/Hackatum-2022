import {Wallbox} from "../../../model/Wallbox";
import SingleWallboxVehicleComponent from "./SingleWallboxVehicleComponent";
import {VehicleInfo} from "../../../model/VehicleInfo";

interface SingleWallboxComponentProps {
    name: string;
    wallbox: Wallbox;

    showVehicleInfo: (vehicleInfo: VehicleInfo) => void;
}

const SingleWallboxComponent = (props: SingleWallboxComponentProps) => {
    return (
        <div className="container text-white fw-bold pt-4">
            <h3>{props.name}</h3>
            {props.wallbox.vehicles.map((vehicle: VehicleInfo) => {
                return (
                    <SingleWallboxVehicleComponent vehicle={vehicle} showVehicleInfo={props.showVehicleInfo}/>
                )
            })}
        </div>
    )
};

export default SingleWallboxComponent;