import {Outlet} from "react-router-dom";
import NavigationBarContainer from "../components/NavigationBar/NavigationBarContainer";

/**
 * General page layout where every page is embedded into.
 */
const PageLayout = () => {
    return (
        <>
            <NavigationBarContainer/>
            {
                <Outlet/>
            }
        </>
    )
}

export default PageLayout;