import SingleVehicleComponent from "./SingleVehicleComponent";
import {VehicleInfo} from "../model/VehicleInfo";

interface VehiclePageComponentProps {
    vehicles?: VehicleInfo[]
}

const VehiclePageComponent = (props: VehiclePageComponentProps) => {
  return (
      <div>
          <div className="row align-items-center justify-content-center dashboard-component h-100">
              {props.vehicles?.map((vehicle: VehicleInfo) => {
                  return (<div className="col-8 py-2 ">
                      <SingleVehicleComponent vehicle={vehicle}/>
                  </div>);
              })}
          </div>
      </div>
  )
}
export default VehiclePageComponent