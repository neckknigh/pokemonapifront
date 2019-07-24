import authLogics from "./logic/auth.logic";
import systemLogics from "./logic/system.logic";

const appLogic = [
    ...authLogics,
    ...systemLogics
];

export default appLogic;
