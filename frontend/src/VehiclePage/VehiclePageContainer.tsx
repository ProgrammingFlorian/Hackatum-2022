import VehiclePageComponent from "./VehiclePageComponent";
import {VehicleInfoDTO} from "../model/VehicleInfoDTO";
import {Requests} from "../common/requests";
import {apiVehiclesRoute} from "../common/apiRoutes";
import {useEffect, useState} from "react";
import {LoadingComponent} from "../components/LoadingComponent";

const VehiclePageContainer = () => {
    const [vehicles, setVehicles] = useState<VehicleInfoDTO[] | null>(null);
    const loadVehicles = () => {
        Requests.getRequest<VehicleInfoDTO[]>(apiVehiclesRoute()).then((vehicles) => {
            setVehicles(vehicles);
        });
    };

    useEffect(() => {
        loadVehicles();
    }, []);

    if (vehicles) {
        return <VehiclePageComponent vehicles={vehicles}/>
    } else {
        return <LoadingComponent message={"Loading..."}/>
    }

};

export default VehiclePageContainer;