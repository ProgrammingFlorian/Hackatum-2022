import DashboardInfoComponent from "./Info/DashboardInfoComponent";
import DashboardWallboxContainer from "./WallboxOverview/DashboardWallboxContainer";
import DashboardNotificationContainer from "./Notifications/DashboardNotificationContainer";

const DashboardComponent = () => {
    return (
        <div className="container-fluid dashboard-component h-100 p-0">
            <div className="container-fluid p-0">
                <DashboardInfoComponent/>
            </div>
            <div className="row justify-content-center m-0">
                <div className="container col-md-7">
                    <DashboardWallboxContainer/>
                </div>
                <div className="col-md-4" style={{borderLeft: "2px solid rgba(0, 0, 0, 0.15)"}}>
                    <div className="container">
                        <DashboardNotificationContainer/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardComponent