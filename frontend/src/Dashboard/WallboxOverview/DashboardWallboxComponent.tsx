import SingleWallboxComponent, {SingleWallboxComponentProps} from "./SingleWallboxComponent";

interface DashboardWallboxComponentProps {
    wallboxes: SingleWallboxComponentProps[];
}

const DashboardWallboxComponent = (props: DashboardWallboxComponentProps) => {
    return (
        <div className="row align-items-center ">
            {props.wallboxes.map((wallbox: SingleWallboxComponentProps) => {
                return (<div className="col-auto">
                    <SingleWallboxComponent name={wallbox.name} batteryPercentage={wallbox.batteryPercentage}/>
                </div>);
            })}
        </div>
    )
};

export default DashboardWallboxComponent;