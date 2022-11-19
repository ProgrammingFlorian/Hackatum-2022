import DashboardNotificationContainer from "../Dashboard/Notifications/DashboardNotificationContainer";


interface VehicleInfoComponentProps {
    hideVehicleInfo: () => void;
}
const VehicleInfoComponent = (props: VehicleInfoComponentProps) => {
    const color_gradient = () => {
        return "linear-gradient(to bottom, " + "red" + " 0%, #333333 70%, #333333 100%)"
    };

    const logo = (brand: String) => {
        if (brand === "Audi") {
            return "audi.png"
        } else if (brand === "BMW") {
            return "bmw.png"
        } else if (brand === "Mercedes Benz") {
            return "mercedes.png"
        }
    };

    return (
        <div className="container text-white px-0 pt-2" style={{boxShadow: "4px"}}>
            <div className="container-fluid info-component px-4 pt-3" style={{background: color_gradient()}}>
                <div className="row justify-content-between align-items-start">
                    <svg xmlns="http://www.w3.org/2000/svg pt-5 px-0" width="40" height="40" fill="white"
                         className="bi bi-x-lg col-auto align-items-center pt-2" viewBox="0 0 16 16" onClick={props.hideVehicleInfo}>
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                    <div className="col-auto pt-4 px-2">
                        <img src={`images/${logo("BMW")}`} height="60px"/>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <div className="px-0 row">
                        <div className="col-sm-6">
                            <div className="fw-bold">
                                <h1>M-HT-1234</h1>
                            </div>
                            <div>
                                <h4>Audi: e-tron</h4>
                            </div>
                        </div>
                        <br/><br/><br/><br/>
                        <div className="col-sm-6">
                            <h3 className="fw-bold">Next Pick-Up:</h3>
                            <text style={{fontSize: "20px"}}>18:45</text>
                            <br/>
                            <text className="py-0" style={{fontSize: "20px"}}>Mr. Marius Weigt</text>
                        </div>
                </div>
                    <div>
                        <br/><br/>
                        <h3>Upcoming:</h3>
                    </div>
                    <div className="container-fluid py-2 pb-3 px-0"
                         style={{ borderRadius: "5px", opacity: "70%"}}>
                        <DashboardNotificationContainer/>
                    </div>
                    </div>

            </div>
        </div>)
};

export default VehicleInfoComponent;