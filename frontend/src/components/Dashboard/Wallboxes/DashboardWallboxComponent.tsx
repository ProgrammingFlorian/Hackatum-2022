import SingleWallboxComponent from "./SingleWallboxComponent";
import {Wallbox} from "../../../model/Wallbox";

interface DashboardWallboxComponentProps {
    wallboxes: Wallbox[];
}

const DashboardWallboxComponent = (props: DashboardWallboxComponentProps) => {
    return (
        <div className="row align-items-center ">
            {props.wallboxes.map((wallbox: Wallbox, index) => {
                return (<div className="col-auto">
                    <SingleWallboxComponent name={`Wallbox ${index}`} wallbox={wallbox}/>
                </div>);
            })}
        </div>
    )
};

export default DashboardWallboxComponent;