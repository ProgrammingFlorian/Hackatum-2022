export interface SingleNotificationComponentProps {
    name: string;
}

const SingleNotificationComponent = (props: SingleNotificationComponentProps) => {
    return (
        <div className="container">
            <h3>{props.name}</h3>
        </div>
    );
};

export default SingleNotificationComponent;