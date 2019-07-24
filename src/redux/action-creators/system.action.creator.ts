import { SystemConstants } from "../../services/constants.service";
import { SystemActions } from "../actions/system.actions";


/**
 * Action-creator para lanzar la acción de validación
 * del teléfono del usuario.
 */
const setLoadingAppStatus = (appIsLoading: boolean): SystemActions => {
    return {
        type: SystemConstants.APP_IS_LOADING,
        appIsLoading
    }
};

const showLoadingScreen = (): SystemActions => {
    return setLoadingAppStatus(true);
};

const hideLoadingScreen = (): SystemActions => {
    return setLoadingAppStatus(false);
};

const setAppWithError = (appHasError: boolean): SystemActions => {
    return {
        type: SystemConstants.APP_HAS_ERROR,
        appHasError
    }
};

const setAppErrorMessage = (errorMessage: string): SystemActions => {
    return {
        type: SystemConstants.APP_ERROR_MESSAGE,
        errorMessage
    }
};

const handleAppError = (
    appErrorMessage: string = "",
    appHasError: boolean = true
): SystemActions => {
    return {
        type: SystemConstants.HANDLE_APP_ERROR,
        appErrorMessage,
        appHasError
    }
}


export const systemActions = {
    showLoadingScreen,
    hideLoadingScreen,
    setAppWithError,
    setAppErrorMessage,
    handleAppError
}