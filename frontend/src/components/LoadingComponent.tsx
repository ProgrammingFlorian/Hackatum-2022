interface LoadingComponentProps {
    message: string;
}

export const LoadingComponent = (props: LoadingComponentProps) => {
    return (
        <div className="position-fixed bg-dark top-0 start-0 h-100 w-100 ">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div>
                    <h1 className="text-light">{props.message}</h1>
                    <div className="text-center text-primary mt-5">
                        <div className="spinner-border" style={{width: "5rem", height: "5rem"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}