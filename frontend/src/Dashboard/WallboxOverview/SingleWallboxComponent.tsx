import {Wallbox} from "../../Model/Wallbox";
import SingleWallboxVehicleComponent from "./SingleWallboxVehicleComponent";
import {VehicleInfo} from "../../Model/VehicleInfo";

interface SingleWallboxComponentProps {
    name: string;
    wallbox: Wallbox;
}

const SingleWallboxComponent = (props: SingleWallboxComponentProps) => {
    return (
        <div className="container text-white fw-bold pt-4">
            <h3>{props.name}</h3>
            {props.wallbox.vehicles.map((vehicle: VehicleInfo) => {
                return (
                    <SingleWallboxVehicleComponent vehicle={vehicle}/>
                )
            })}
        </div>
    )
};

export default SingleWallboxComponent;