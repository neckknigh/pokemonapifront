import authLogics from "./logic/auth.logic";
import systemLogics from "./logic/system.logic";
import comunityLogics from "./logic/comunity.logic";
import promotionLogics from "./logic/promotion.logic";

const appLogic = [
    ...authLogics,
    ...systemLogics,
    ...comunityLogics,
    ...promotionLogics
];

export default appLogic;
