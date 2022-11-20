import {TaskDTO} from "../../../model/TaskDTO";

export interface SingleTaskComponentProps {
    task: TaskDTO;
}

const SingleTaskComponent = (props: SingleTaskComponentProps) => {
    console.log(props.task.dateTime);

    const timeTillNotification = new Date(Date.now() - new Date(props.task.dateTime).getTime());
    let timeString;

    if(timeTillNotification.getHours() > 0) {
        timeString = `${timeTillNotification.getHours()}h ${timeTillNotification.getMinutes()}m`;
    } else {
        timeString = `${timeTillNotification.getMinutes()}m`;
    }

    return (
        <div className="container container-fluid notification-component text-white w-100">
            <div className="row justify-content-between pt-1">
                <div className="col-auto py-0">
                    <h3 className="p-0 m-0 fw-bold">{props.task.licensePlate}</h3>
                    <text className="p-0  m-0">{props.task.brand}: {props.task.model}</text>
                </div>
                <div className="col-auto py-0 text-end">
                    <text>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                             className="bi bi-clock" viewBox="0 0 16 18">
                            <path
                                d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        &nbsp;{timeString}
                    </text>
                </div>
            </div>
            <div className="row py-3">
                <div className="col-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#FF5F00"
                         className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                        <path
                            d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                        <path fill-rule="evenodd"
                              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                    </svg>

                </div>
                <div className="col-auto align-self-center fw-bold" >
                  Wallbox {props.task.from_p_id}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-arrow-right col-auto align-self-center" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
                <text className="col-auto align-self-center fw-bold">
                    &nbsp;Slot {props.task.to_p_id}
                </text>

            </div>

        </div>
    );
};

export default SingleTaskComponent;