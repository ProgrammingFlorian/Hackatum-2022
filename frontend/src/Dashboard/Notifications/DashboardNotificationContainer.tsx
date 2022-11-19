import DashboardNotificationComponent from "./DashboardNotificationComponent";

const DashboardNotificationContainer = () => {
    return <DashboardNotificationComponent notifications={
        [
        {name: "Notifications 1"},
        {name: "Notifications 2"},
        {name: "Notifications 3"},
        {name: "Notifications 4"}
    ]}/>;
};

export default DashboardNotificationContainer;