import NavigationBarComponent from "./NavigationBarComponent";
import {pageDashboard} from "../common/pageRoutes";
import {useNavigate} from "react-router-dom";

const NavigationBarContainer = () => {
    const navigate = useNavigate();

    const onLogoClick = () => {
        navigate(pageDashboard());
    };


    return NavigationBarComponent(
        {onLogoClick}
    )
}


export default NavigationBarContainer;