import {VehicleInfoDTO} from "../../../model/VehicleInfoDTO";
import {useEffect, useState} from "react";

interface SingleWallboxVehicleComponentProps {
    vehicle: VehicleInfoDTO;

    showVehicleInfo: (vehicleInfo: VehicleInfoDTO) => void;
}

const SingleWallboxVehicleComponent = (props: SingleWallboxVehicleComponentProps) => {
    const [currentBatteryLevel, setCurrentBatteryLevel] = useState<number>(props.vehicle.batteryLevel);
    const [remainingTimeText, setRemainingTimeText] = useState<string>("");
    /*
    0 - not charged yet
    1 - charging
    2 - finished charging
     */
    const [isCharging, setCharging] = useState<number>(0);

    const getBatteryLevelColorCode = (percentage: number): string => {
        if (percentage < 20) {
            return "rgba(255,41,41,0.77)"
        } else if (percentage < 40) {
            return "rgba(255,87,16,0.77)"
        } else if (percentage < 60) {
            return "rgba(227,176,27,0.77)"
        } else if (percentage < 80) {
            return "#4DC167"
        } else {
            return "#308540"
        }
    };

    const showVehicleInfo = () => {
        props.showVehicleInfo(props.vehicle);
    };

    const calculateBattery = () => {
        let text;

        let batteryLevel = props.vehicle.batteryLevel;
        const chargingStartDate = new Date(props.vehicle.chargingStart).getTime();
        const chargingEndDate = new Date(props.vehicle.chargingEnd).getTime();
        const now = Date.now();
        let charging;
        if (chargingEndDate - now < 0) {
            charging = 2;
            text = "Finished charging";
            batteryLevel = 100;
        } else if (chargingStartDate - now < 0) {
            charging = 1;
            const chargingEndDate = new Date(props.vehicle.chargingEnd).getTime();
            const remainingTime = new Date(chargingEndDate - now);
            const chargingDuration = new Date(chargingEndDate - chargingStartDate);
            if (remainingTime.getHours() - 1 > 0) {
                text = `${remainingTime.getHours() - 1}h ${remainingTime.getMinutes()}m remaining`
            } else {
                text = `${remainingTime.getMinutes()}m remaining`
            }
            const charged = (100 - batteryLevel) - ((remainingTime.getTime() / chargingDuration.getTime()) * (100 - batteryLevel));
            batteryLevel += charged;
        } else {
            charging = 0;
            const remainingTime = new Date(chargingStartDate - now);
            if (remainingTime.getHours() - 1 > 0) {
                text = `In ${remainingTime.getHours() - 1}h ${remainingTime.getMinutes()}m`
            } else {
                text = `In ${remainingTime.getMinutes()}m`
            }
        }
        setCurrentBatteryLevel(batteryLevel);
        setRemainingTimeText(text);
        setCharging(charging ? 1 : 0);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            calculateBattery();
        }, 100);
    }, []);

    return (
        <div>

            <div className="progress position-relative row mb-3"
                 style={{
                     height: "150px",
                     width: "300px",
                     background: "#535353",
                     cursor: "pointer",
                     userSelect: "none",
                     boxShadow: "rgb(0 0 0 / 19%) 0px 1px 5px 0px"
                 }}
                 onClick={showVehicleInfo}>
                <div className="progress-bar progress-bar-component"
                     style={{
                         width: (currentBatteryLevel) + "%",
                         background: getBatteryLevelColorCode(currentBatteryLevel)
                     }}>
                </div>
                <div className="container text-start overlay pt-2">
                    <text
                        style={{fontSize: "15px"}}>{isCharging ? "Charging" : "Battery Level"}: {Math.round(currentBatteryLevel)}%
                    </text>
                    <h3 className="p-0 m-0 fw-bold pt-2">{props.vehicle.licensePlate}</h3>
                    <text style={{fontSize: "15px"}}>{props.vehicle.brand}: {props.vehicle.model}</text>
                    <br/>
                    <br/>
                    <div className="row align-items-start">
                        {isCharging === 1 ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-lightning-charge col-auto " viewBox="0 0 16 16">
                                <path
                                    d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z"/>
                            </svg>
                            : isCharging === 0 ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-lightning-charge col-auto " viewBox="0 0 16 18">
                                    <path
                                        d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-check-circle col-auto" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path
                                        d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                </svg>
                        }
                        <text className="col-auto px-0" style={{fontSize: "20px"}}>
                            {remainingTimeText}
                        </text>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default SingleWallboxVehicleComponent;