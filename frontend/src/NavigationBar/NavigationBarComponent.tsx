
interface NavigationBarProps {
    onLogoClick?: () => void;
}


const NavigationBarComponent = (props: NavigationBarProps) => {

    return (
        <nav className="shadow navbar navbar-expand-sm fixed-top mb-5">
            <div className="container-fluid">
                <a className="navbar-brand text-white" onClick={props.onLogoClick} style={{cursor: "pointer"}}>

                </a>
            </div>
        </nav>
    );

}
export default NavigationBarComponent