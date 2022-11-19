import {VehicleInfo} from "../model/VehicleInfo";

interface SingleVehicleComponentProps {
    vehicle: VehicleInfo
}


const SingleVehicleComponent = (props: SingleVehicleComponentProps) => {

    const logo = (brand: String) => {
        if (brand === "Audi") {
            return "audi.png"
        } else if (brand === "BMW") {
            return "bmw.png"
        } else if (brand === "Mercedes Benz") {
            return "mercedes.png"
        }
    };

  return<div className="row container-fluid notification-component justify-content-between">
      <div className="col-auto fw-bold text-white py-2">
        <h2>M-HT-1234</h2>
        <h4>Audi: e-tron</h4>
      </div>
    <div className="col-auto align-items-center pt-3">
        <img src={`images/${logo(props.vehicle.brand)}`} height="60px"/>
    </div>



  </div>
}
export default SingleVehicleComponent