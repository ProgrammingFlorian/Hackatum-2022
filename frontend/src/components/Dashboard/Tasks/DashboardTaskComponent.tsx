import SingleTaskComponent, {SingleTaskComponentProps} from "./SingleTaskComponent";
import {TaskDTO} from "../../../model/TaskDTO";

interface DashboardTaskComponentProps {
    tasks: TaskDTO[];
}

const DashboardTaskComponent = (props: DashboardTaskComponentProps) => {
    return (
        <div className="row">
            {props.tasks.sort((c1, c2) => new Date(c2.dateTime).getTime() - new Date(c1.dateTime).getTime()).map((task: TaskDTO) => {
                return (<div className="w-100 py-2">
                    <SingleTaskComponent task={task}/>
                </div>);
            })}
        </div>
    )
};

export default DashboardTaskComponent;