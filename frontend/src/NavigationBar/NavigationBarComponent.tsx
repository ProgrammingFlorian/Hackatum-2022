interface NavigationBarProps {

}

const NavigationBarComponent = (props: NavigationBarProps) => {
    const isDashboardPage = window.location.href.endsWith('/');
    const isVehiclesPage = window.location.href.endsWith('vehicles');

    return (
        <nav className="navbar navbar-expand-lg color-orange">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <div className="" style={{backgroundImage: "sixt-logo.png", height: "30px", width: "60px"}}>
                        <img src="sixt-logo.png" alt="Logo" height={30} width={70} style={{display: 'block'}}/>
                    </div>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <a className={"nav-link " + (isDashboardPage ? 'active' : '')} href="/">Dashboard</a>
                        <a className={"nav-link " + (isVehiclesPage ? 'active' : '')} href="/vehicles">Vehicles</a>
                    </div>
                    <div className="navbar-right">
                        <a className="nav-link" href="/logout">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBarComponent;