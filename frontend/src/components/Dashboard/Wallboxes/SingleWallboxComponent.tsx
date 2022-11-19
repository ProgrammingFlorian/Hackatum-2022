import {WallboxDTO} from "../../../model/WallboxDTO";
import SingleWallboxVehicleComponent from "./SingleWallboxVehicleComponent";
import {VehicleInfoDTO} from "../../../model/VehicleInfoDTO";

interface SingleWallboxComponentProps {
    name: string;
    wallbox: WallboxDTO;

    showVehicleInfo: (vehicleInfo: VehicleInfoDTO) => void;
}

const SingleWallboxComponent = (props: SingleWallboxComponentProps) => {
    return (
        <div className="container text-white fw-bold pt-4 w-100">
            <h3>{props.name}</h3>
            {props.wallbox.vehicles.map((vehicle: VehicleInfoDTO) => {
                return (
                    <SingleWallboxVehicleComponent vehicle={vehicle} showVehicleInfo={props.showVehicleInfo}/>
                )
            })}
        </div>
    )
};

export default SingleWallboxComponent;