import NavigationBarComponent from "./NavigationBarComponent";
import {pageDashboard, pageVehicle} from "../common/pageRoutes";
import {useNavigate} from "react-router-dom";

const NavigationBarContainer = () => {
    const navigate = useNavigate();

    const onLogoClick = () => {
        navigate(pageDashboard());
    };

    const onDashboardClick = () => {
        navigate(pageDashboard());
    };

    const onVehiclesClick = () => {
        navigate(pageVehicle());
    };


    return NavigationBarComponent({
            onLogoClick,
            onDashboardClick,
            onVehiclesClick
        })
}


export default NavigationBarContainer;