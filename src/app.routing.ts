export const privateRoutes = [
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