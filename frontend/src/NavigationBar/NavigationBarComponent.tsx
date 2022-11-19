
interface NavigationBarProps {
    onLogoClick?: () => void;
    onDashboardClick?: () => void
    onVehiclesClick?: () => void
}


const NavigationBarComponent = (props: NavigationBarProps)=> {


    return (
        <nav className="navbar-expand-sm fixed-top mb-5 color-orange ">
            <div className="container-fluid row justify-content-start user-select-none">
                <div className="col-auto">
                    <a className="navbar-brand text-white" onClick={props.onLogoClick} style={{cursor: "pointer"}}>
                        <img alt={"logo"} height={100} width={100}/>
                    </a>
                </div>
                <div className="col-auto text-white fw-bold dashboard-button" onClick={props.onDashboardClick}>
                    {"Dashboard"}
                </div>
                <div className="col-auto text-white fw-bold dashboard-button" onClick={props.onVehiclesClick}>
                    {"Vehicles"}
                </div>
                <div className="col text-white fw-bold text-end dashboard-button" >
                    {"Logout"}
                </div>
            </div>
        </nav>
    );

}
export default NavigationBarComponent