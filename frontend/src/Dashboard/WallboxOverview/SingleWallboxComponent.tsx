export interface SingleWallboxComponentProps {
    name: string;
}

const SingleWallboxComponent = (props: SingleWallboxComponentProps) => {
    const color_function = (percentage: number) => {
        if (percentage < 21) {
            return "red"
        } else if (percentage < 40) {
            return "orange"
        } else if (percentage < 60) {
            return "#C09518C5"
        } else if (percentage < 80) {
            return "#4DC167"
        } else {
            return "green"
        }
    }
    const percentage = 40;
    return (
        <div className="container text-white fw-bold pt-4">
            <h3>{props.name}</h3>
                    <div className="progress " style={{height:"150px", width:"300px", background:"#535353"}}>
                        <div className="progress-bar progress-bar-component" style={{width:percentage + "%", background:color_function(percentage)}}>
                            <div className="container text-start overlay">
                                <text style={{fontSize:"15px"}}>Charging: 92%</text>
                                <h3 className="p-0 m-0 fw-bold pt-2">M-HT-0001</h3>
                                <text style={{fontSize:"15px"}}>Mercedes Benz: A-Klasse</text>
                                <br/>
                                <br/>
                                <div className="row align-items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         className="bi bi-lightning-charge col-auto " viewBox="0 0 16 16">
                                        <path
                                            d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z"/>
                                    </svg>
                                    <text className="col-auto px-0" style={{fontSize:"20px"}}>
                                        12 minutes remaining
                                    </text>
                                </div>
                            </div>
                        </div>


                </div>

            </div>
    )
};

export default SingleWallboxComponent;