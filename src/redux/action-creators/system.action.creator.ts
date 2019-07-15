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
}

export const systemActions = {
    setLoadingAppStatus
}