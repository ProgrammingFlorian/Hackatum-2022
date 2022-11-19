import DashboardInfoComponent from "./Info/DashboardInfoComponent";
import DashboardWallboxContainer from "./WallboxOverview/DashboardWallboxContainer";
import DashboardNotificationContainer from "./Notifications/DashboardNotificationContainer";

interface DashboardComponentProps {
    isCheckinLoading: boolean;

    showVehicleInfo: (vehicleId: number) => void;
    hideVehicleInfo: () => void;
}

const DashboardComponent = (props: DashboardComponentProps) => {
    return props.isCheckinLoading ? (
        <div className="position-fixed bg-dark top-0 start-0 h-100 w-100 ">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div>
                    <h1 className="text-light">Currently checking in your vehicle...</h1>
                    <div className="text-center text-primary mt-5">
                        <div className="spinner-border" style={{width: "5rem", height: "5rem"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
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