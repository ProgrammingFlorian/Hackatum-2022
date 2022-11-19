


interface NavigationBarProps {
    onLogoClick?: () => void;
    onDashboardClick?: () => void
    onVehiclesClick?: () => void
}


const NavigationBarComponent = (props: NavigationBarProps)=> {
    const underline = (name: String) => {
        if  (window.location.href.endsWith('/') && name == "Dashboard") {
            return <text className="text-decoration-underline text-white">
                {name}
            </text>
        } else if (window.location.href.endsWith('vehicles') && name == "Vehicles"){
            return <text className="text-decoration-underline text-white">
                {name}
            </text>
        } else {
            return <text>
                {name}
            </text>
        }
    }

    return (
        <nav className="navbar-expand-sm fixed-top mb-5 color-orange navbar-container">
            <div className="container-fluid row justify-content-start user-select-none h-100">
                <div className="col-auto">
                    <a className="navbar-brand" onClick={props.onLogoClick} style={{cursor: "pointer"}}>
                        <img src="sixt-logo.png" height={45} width={90}/>
                    </a>
                </div>
                <div className="col-auto pt-2 text-white fw-bold dashboard-button" onClick={props.onDashboardClick}>
                    {underline("Dashboard")}
                </div>
                <div className="col-auto pt-2 text-white fw-bold dashboard-button" onClick={props.onVehiclesClick}>
                    {underline("Vehicles")}
                </div>
                <div className="col pt-2 text-white px-0 fw-bold text-end dashboard-button" >
                    {"Logout"}
                </div>
            </div>
        </nav>
    );

}
export default NavigationBarComponent