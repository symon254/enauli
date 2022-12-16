import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Vehicles = lazy(() => import("../pages/Vehicles/Vehicles"));

const paths = {
    public: [
        {
            element: Dashboard,
            path: "/dashboard",
        },

        {
            element: Vehicles,
            path: "/vehicles",
        },
    ],

    sidebar: [
        {
            path: "/vehicles",
            name: "Vehicles",
            icon: "bx bx-car",
        },
    ],
};

export default paths;
