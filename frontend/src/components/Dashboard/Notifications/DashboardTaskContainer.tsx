import DashboardTaskComponent from "./DashboardTaskComponent";
import {TaskDTO} from "../../../model/TaskDTO";

interface DashboardTaskContainerProps {
    tasks: TaskDTO[];
}


const DashboardTaskContainer = (props: DashboardTaskContainerProps) => {
    return <DashboardTaskComponent tasks={props.tasks}/>;
};

export default DashboardTaskContainer;