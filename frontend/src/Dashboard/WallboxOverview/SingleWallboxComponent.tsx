export interface SingleWallboxComponentProps {
    name: string;
}

const SingleWallboxComponent = (props: SingleWallboxComponentProps) => {
    return (
        <div className="container">
            <h3>{props.name}</h3>
        </div>
    )
};

export default SingleWallboxComponent;