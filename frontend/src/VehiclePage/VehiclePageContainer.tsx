import VehiclePageComponent from "./VehiclePageComponent";
import {VehicleInfoDTO} from "../model/VehicleInfoDTO";

const VehiclePageContainer = () => {
    const vehicles: VehicleInfoDTO[] =
        [
            {
                vehicleId: 4,
                color: 'red',
                licensePlate: 'M SX 0001',
                nextPickUpCustomer: "Marius",
                nextPickUpTime: new Date(),
                batteryLevel: 20,
                brand: "Audi",
                model: "A1",
                vehicleClass: "Class",
                chargingSpeed: 10
            },
            {
                vehicleId: 4,
                color: 'red',
                licensePlate: 'M SX 0001',
                nextPickUpCustomer: "Max",
                nextPickUpTime: new Date,
                batteryLevel: 50,
                brand: "Audi",
                model: "A1",
                vehicleClass: "Class",
                chargingSpeed: 10
            }
        ];

    return <VehiclePageComponent vehicles={vehicles}/>
};

export default VehiclePageContainer;