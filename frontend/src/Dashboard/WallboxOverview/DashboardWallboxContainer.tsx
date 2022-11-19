import DashboardWallboxComponent from "./DashboardWallboxComponent";

const DashboardWallboxContainer = () => {
    return <DashboardWallboxComponent wallboxes={[
        {name: "Wallbox 1", batteryPercentage: 0.30},
        {name: "Wallbox 2", batteryPercentage: 0.58},
        {name: "Wallbox 3", batteryPercentage: 0.92},
        {name: "Wallbox 4", batteryPercentage: 0.13}
    ]}/>;
};

export default DashboardWallboxContainer;