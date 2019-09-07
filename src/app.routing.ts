export const privateRoutes = [
    {
        path: "/",
        component: "AuthComponent"
    },
    {
        path: "/auth",
        component: "AuthComponent"
    },
    {
        path: "/comunities",
        component: "DashBoardComponent"
    },
    {
        path: "/comunity/:id([0-9]+)",
        component: "ComunitySummaryComponent"
    },
    {
        path: "/signup",
        component: "SignUpComponent"
    },
    {
        path: "/incoming_features",
        component: "IncomingFeaturesComponent"
    }
];