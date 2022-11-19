import SingleNotificationComponent, {SingleNotificationComponentProps} from "./SingleNotificationComponent";

interface DashboardNotificationComponentProps {
    notifications: SingleNotificationComponentProps[];
}

const DashboardNotificationComponent = (props: DashboardNotificationComponentProps) => {
    return (
        <div className="row bg-white">
            {props.notifications.map((notification: SingleNotificationComponentProps) => {
                return (<div className="col">
                    <SingleNotificationComponent name={notification.name}/>
                </div>);
            })}
        </div>
    )
};

export default DashboardNotificationComponent;