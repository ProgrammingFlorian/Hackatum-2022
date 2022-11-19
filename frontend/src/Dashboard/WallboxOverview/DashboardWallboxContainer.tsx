import DashboardWallboxComponent from "./DashboardWallboxComponent";

const DashboardWallboxContainer = () => {
    return <DashboardWallboxComponent wallboxes={[
        {name: "Wallbox 1"},
        {name: "Wallbox 2"},
        {name: "Wallbox 3"},
        {name: "Wallbox 4"}
    ]}/>;
};

export default DashboardWallboxContainer;