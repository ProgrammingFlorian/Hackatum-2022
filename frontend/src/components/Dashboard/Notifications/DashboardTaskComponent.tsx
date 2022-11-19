import SingleNotificationComponent, {SingleNotificationComponentProps} from "./SingleNotificationComponent";
import {TaskDTO} from "../../../model/TaskDTO";

interface DashboardTaskComponentProps {
    tasks: TaskDTO[];
}

const DashboardTaskComponent = (props: DashboardTaskComponentProps) => {
    return (
        <div className="row">
            {props.tasks.map((task: TaskDTO) => {
                return (<div className="w-100 py-2">
                    <SingleNotificationComponent name={task.taskName}/>
                </div>);
            })}
        </div>
    )
};

export default DashboardTaskComponent;