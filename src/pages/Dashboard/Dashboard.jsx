import React from "react";

const Dashboard = () => {
    return (
        <div className="flex flex-col">
            <div>
                <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"></div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1"></div>
        </div>
    );
};

export default Dashboard;
