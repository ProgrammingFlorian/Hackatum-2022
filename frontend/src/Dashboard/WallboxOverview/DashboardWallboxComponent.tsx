import SingleWallboxComponent, {SingleWallboxComponentProps} from "./SingleWallboxComponent";

interface DashboardWallboxComponentProps {
    wallboxes: SingleWallboxComponentProps[];
}

const DashboardWallboxComponent = (props: DashboardWallboxComponentProps) => {
    return (
        <div className="row bg-white align-items-center ">
            {props.wallboxes.map((wallbox: SingleWallboxComponentProps) => {
                return (<div className="col">
                    <SingleWallboxComponent name={wallbox.name}/>
                </div>);
            })}
        </div>
    )
};

export default DashboardWallboxComponent;