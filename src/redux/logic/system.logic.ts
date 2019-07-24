import { createLogic } from "redux-logic";
import { SystemConstants } from "../../services/constants.service";
import { systemActions } from "../action-creators/system.action.creator";
import { IHandleAppErrorAction } from "../actions/system.actions";

/**
 * Permite establecer un mensaje de error en la aplicación.
 */
export const handleAppError = createLogic<
    any,
    any,
    any,
    any,
    any,
    any,
    IHandleAppErrorAction
>({
    type: SystemConstants.HANDLE_APP_ERROR,
    latest: true,
    process({ action }, dispatch, done) {
        dispatch(systemActions.setAppWithError(action.appHasError));
        dispatch(systemActions.setAppErrorMessage(action.appErrorMessage));
        done();
    }
});

const systemLogics = [
    handleAppError
];

export default systemLogics;