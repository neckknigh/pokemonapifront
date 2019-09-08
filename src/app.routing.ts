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
        path: "/comunities/:id([0-9]+)",
        component: "ComunitySummaryComponent"
    },
    {
        path: "/comunities",
        component: "DashBoardComponent"
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