import DashboardInfoComponent from "./Info/DashboardInfoComponent";
import DashboardWallboxContainer from "./WallboxOverview/DashboardWallboxContainer";
import DashboardNotificationContainer from "./Notifications/DashboardNotificationContainer";

const DashboardComponent = () => {
    return (
        <div className="container-fluid dashboard-component h-100">
            <div className="container-fluid">
                <DashboardInfoComponent/>
            </div>
            <hr className="rounded"/>
            <div className="row justify-content-center">
                <div className="container col-md-7">
                    <DashboardWallboxContainer/>
                </div>
                <hr className="col-md-1 vertical"/>
                <div className="container col-md-4">
                    <DashboardNotificationContainer/>
                </div>
            </div>
        </div>
    )
}
export default DashboardComponent