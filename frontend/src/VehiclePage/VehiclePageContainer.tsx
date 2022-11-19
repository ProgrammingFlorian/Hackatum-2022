
import VehiclePageComponent from "./VehiclePageComponent";
import {useState} from "react";
import {VehicleInfo} from "../model/VehicleInfo";


interface VehiclePageContainerProps {
  vehicles: [
    {
      vehicleId: 4,
      color: 'red',
      licensePlate: 'M SX 0001',
      nextPickUpCustomer: String,
      upcomingTasks: [],
      nextPickUpTime: String,
      batteryLevel: 20,
      brand: "Audi"
    },
    {
      vehicleId: 4,
      color: 'red',
      licensePlate: 'M SX 0001',
      nextPickUpCustomer: String,
      upcomingTasks: [],
      nextPickUpTime: String,
      batteryLevel: 50,
      brand: "Audi"
    }
  ]
}


const VehiclePageContainer = (props: VehiclePageContainerProps) => {

  // @ts-ignore
  return <VehiclePageComponent vehicles={props.vehicles}/>
}

export default VehiclePageContainer