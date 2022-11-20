import DashboardTaskContainer from "../Dashboard/Tasks/DashboardTaskContainer";
import {VehicleInfoDTO} from "../../model/VehicleInfoDTO";
import {TaskDTO} from "../../model/TaskDTO";


interface VehicleInfoComponentProps {
    vehicle: VehicleInfoDTO;
    tasks: TaskDTO[];

    hideVehicleInfo: () => void;
}

const VehicleInfoComponent = (props: VehicleInfoComponentProps) => {
    const colorGradient = (color: string) => {
        return `linear-gradient(to bottom, ${color} 0%, #333333 70%, #333333 100%)`
    };

    const logo = (brand: String) => {
        if (brand.toLowerCase() === "audi") {
            return "audi.png"
        } else if (brand.toLowerCase() === "bmw") {
            return "bmw.png"
        } else if (brand.toLowerCase() === "mercedes") {
            return "mercedes.png"
        }
    };

    return (
        <div className="container text-white px-0 pt-2" style={{boxShadow: "4px"}}>
            <div className="container-fluid info-component px-4 pt-3"
                 style={{background: colorGradient(props.vehicle.color)}}>
                <div className="row justify-content-between align-items-start">
                    <svg xmlns="http://www.w3.org/2000/svg pt-5 px-0" width="40" height="40" fill="white"
                         className="bi bi-x-lg col-auto align-items-center pt-2" viewBox="0 0 16 16"
                         onClick={props.hideVehicleInfo}>
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                    <div className="col-auto pt-4 px-2">
                        <img src={`images/${logo(props.vehicle.brand)}`} alt="Brand Logo" height="60px"/>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <div className="px-0 row">
                        <div className="col-sm-6">
                            <div className="fw-bold">
                                <h1>{props.vehicle.licensePlate}</h1>
                            </div>
                            <div>
                                <h4>{props.vehicle.brand}: {props.vehicle.model}</h4>
                            </div>
                        </div>
                        <br/><br/><br/><br/>
                        <div className="col-sm-6">
                            <h3 className="fw-bold">Next Pick-Up:</h3>
                            {/* TODO */}
                            <text style={{fontSize: "20px"}}>{props.vehicle.checkout_date.toString()}</text>
                            <br/>
                            <text className="py-0" style={{fontSize: "20px"}}>{props.vehicle.nextCustomer}</text>
                        </div>
                    </div>
                    <div>
                        <br/><br/>
                        <h3>Upcoming:</h3>
                    </div>
                    <div className="container-fluid py-2 pb-3 px-0"
                         style={{borderRadius: "5px", opacity: "70%"}}>
                        <DashboardTaskContainer tasks={props.tasks}/>
                    </div>
                </div>
            </div>
        </div>)
};

export default VehicleInfoComponent;