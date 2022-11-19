
// @ts-ignore
import sixt_logo from "frontend/src/logo.svg"


interface NavigationBarProps {
    onLogoClick?: () => void;
}


const NavigationBarComponent = (props: NavigationBarProps)=> {

    return (
        <nav className="shadow navbar navbar-expand-sm fixed-top mb-5">
            <div className="container-fluid">
                <a className="navbar-brand text-white" onClick={props.onLogoClick} style={{cursor: "pointer"}}>
                    <img alt={"Logo"} src={sixt_logo} height={50} width={50}/>
                </a>
            </div>
        </nav>
    );

}
export default NavigationBarComponent