import DashboardNotificationContainer from "../Dashboard/Notifications/DashboardNotificationContainer";

const VehicleInfoComponent = () => {
    const color_gradient = () => {
        return "linear-gradient(to bottom, " + "red" + " 0%, #535353 50%, #535353 100%)"
    }
    const logo = (brand: String) => {
        if (brand == "Audi") {
            return "audi.png"
        } else if (brand == "BWW") {
            return "bmw.png"
        } else if (brand == "Mercedes Benz") {
            return "mb.png"
        }

    }


    return (
    <div className="container dashboard-component text-white" >
        <div className="container-fluid info-component" style={{background: color_gradient()}}>
            <div className="row justify-content-between align-items-start py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white"
                     className="bi bi-x-lg col-auto align-items-center" viewBox="0 0 16 16">
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
                <div className="col-auto pt-5 px-5">
                    <img src="audi.png" height="60px"/>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="fw-bold">
                <h1>M-HT-1234</h1>
            </div>
            <div>
                <h4>Audi: e-tron</h4>
            </div>
            <div>
                <br/>
                <h3 className="fw-bold">Next Pick-Up:</h3>

                <text style={{fontSize:"20px"}}>18:45</text>
                <br/>
                <text className="py-0" style={{fontSize:"20px"}}>Mr. Marius Weigt</text>
                <br/>
                <br/>
                <br/>
                <h3>Upcoming:</h3>
                <br/>
            </div>
            <div className="container-fluid py-2" style={{background: "#333333", borderRadius: "5px", opacity: "70%"}}>
                <DashboardNotificationContainer></DashboardNotificationContainer>

            </div>
        </div>





    </div>)
}

export default VehicleInfoComponent