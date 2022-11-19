import SingleNotificationComponent, {SingleNotificationComponentProps} from "./SingleNotificationComponent";

interface DashboardNotificationComponentProps {
    notifications: SingleNotificationComponentProps[];
}

const DashboardNotificationComponent = (props: DashboardNotificationComponentProps) => {
    return (
        <div className="row">
            {props.notifications.map((notification: SingleNotificationComponentProps) => {
                return (<div className="w-100 py-2">
                    <SingleNotificationComponent name={notification.name}/>
                </div>);
            })}
        </div>
    )
};

export default DashboardNotificationComponent;