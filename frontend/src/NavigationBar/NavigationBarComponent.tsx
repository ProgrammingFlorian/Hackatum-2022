
interface NavigationBarProps {
    onLogoClick?: () => void;
}


const NavigationBarComponent = (props: NavigationBarProps)=> {

    return (
        <nav className="navbar-expand-sm fixed-top mb-5 color-orange ">
            <div className="container-fluid">
                <a className="navbar-brand text-white" onClick={props.onLogoClick} style={{cursor: "pointer"}}>
                    <img alt={"logo"} height={100} width={100}/>
                </a>
            </div>
        </nav>
    );

}
export default NavigationBarComponent