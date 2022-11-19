import DashboardInfoComponent from "./Info/DashboardInfoComponent";
import DashboardWallboxContainer from "./WallboxOverview/DashboardWallboxContainer";
import DashboardNotificationContainer from "./Notifications/DashboardNotificationContainer";

const DashboardComponent = () => {
    return (
        <div className="container-fluid">
            <div className="container-fluid">
                <DashboardInfoComponent/>
            </div>
            <div className="row justify-content-center">
                <div className="container col-md-8">
                    <DashboardWallboxContainer/>
                </div>
                <div className="container col-md-4">
                    <DashboardNotificationContainer/>
                </div>
            </div>
        </div>
    )
}
export default DashboardComponent