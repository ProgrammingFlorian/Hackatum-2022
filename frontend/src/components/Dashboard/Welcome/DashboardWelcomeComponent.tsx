const DashboardWelcomeComponent = () => {
    return (
        <div className="row px-4 py-5 dashboard-info-component align-items-between" style={{boxShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.7)"}}>
            <div className="px-4 col-sm-8">
                <text className=" pt-4 text-white">
                    Hey Ben,<br/> you are today's vehicle manager.
                </text>
            </div>
            <div className="col-sm-4 text-end d-none d-md-block">
                <text className="text-white" style={{fontSize:"80px"}}>
                    ReFlow
                </text>

            </div>
        </div>

    )
};

export default DashboardWelcomeComponent;