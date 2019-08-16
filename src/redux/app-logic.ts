import authLogics from "./logic/auth.logic";
import systemLogics from "./logic/system.logic";
import comunityLogics from "./logic/comunity.logic";

const appLogic = [
    ...authLogics,
    ...systemLogics,
    ...comunityLogics
];

export default appLogic;
