import DashboardInfoComponent from "./Info/DashboardInfoComponent";
import DashboardWallboxContainer from "./WallboxOverview/DashboardWallboxContainer";
import DashboardNotificationContainer from "./Notifications/DashboardNotificationContainer";

const DashboardComponent = () => {
    return (
        <>
            <div className="container">
                <DashboardInfoComponent/>
            </div>
            <div className="container col-md-8">
                <DashboardWallboxContainer/>
            </div>
            <div className="container col-md-8">
                <DashboardNotificationContainer/>
            </div>
        </>
    )
}
export default DashboardComponent