import {VehicleInfoDTO} from "../model/VehicleInfoDTO";

interface SingleVehicleComponentProps {
    vehicle: VehicleInfoDTO;
}

const SingleVehicleComponent = (props: SingleVehicleComponentProps) => {
    const logo = (brand: String) => {
        if (brand.toLowerCase() === "audi") {
            return "audi.png"
        } else if (brand.toLowerCase() === "bmw") {
            return "bmw.png"
        } else if (brand.toLowerCase() === "mercedes") {
            return "mercedes.png"
        }
    };

    return <div className="row container-fluid notification-component justify-content-between">
        <div className="col-auto fw-bold text-white py-2">
            <h2>{props.vehicle.licensePlate}</h2>
            <h4>{props.vehicle.brand}:&nbsp;{props.vehicle.model}</h4>
        </div>
        <div className="col-auto align-items-center pt-3">
            <img alt="Brand Icon" src={`images/${logo(props.vehicle.brand)}`} height="60px"/>
        </div>
        <div className="pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#FF5F00"
                 className="bi bi-lightning-charge col-auto" viewBox="0 0 16 16">
                <path
                    d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z"/>
            </svg>
            <text className="text-white">
                &nbsp;{props.vehicle.batteryLevel}&nbsp;%
            </text>
        </div>
    </div>
};

export default SingleVehicleComponent;