import DashboardComponent from "../Dashboard/DashboardComponent";
import {useEffect, useState} from "react";
import {VehicleInfo} from "../Model/VehicleInfo";
import {Requests} from "../common/requests";
import {apiVehicleCheckinRoute, apiVehicleInfoRoute} from "../common/apiRoutes";
import {SuccessDTO} from "../Model/SuccessDTO";

const DashboardContainer = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkin = urlParams.get("checkin");

    const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
    const [isCheckinLoading, setCheckinLoading] = useState<boolean>(false);

    const showVehicleInfo = (vehicleId: number) => {
        Requests.getRequest<VehicleInfo>(apiVehicleInfoRoute(vehicleId)).then((vehicle) => {
            setVehicleInfo(vehicle)
        })
    }

    const hideVehicleInfo = () => {
        setVehicleInfo(null);
    }

    useEffect(() => {
        if (checkin) {
            const vehicleId = Number(checkin);
            setCheckinLoading(true);
            Requests.postRequest<SuccessDTO>(apiVehicleCheckinRoute(vehicleId), {}).then(success => {
                if (success.success) {
                    showVehicleInfo(vehicleId);
                } else {
                    console.log("Checkin failed!");
                }
            });
        }
    });

    return (
        <DashboardComponent isCheckinLoading={isCheckinLoading}
                            showVehicleInfo={showVehicleInfo} hideVehicleInfo={hideVehicleInfo}/>
    );
}


export default DashboardContainer;