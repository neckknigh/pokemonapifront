import { Action } from "redux";
import { SystemConstants } from "../../services/constants.service";

/**
 * Interface de la acción que se dispara
 * cuando el sistema realiza algún tipo de procesamiento.
 */
export interface IAppIsLoadingAction extends Action<SystemConstants.APP_IS_LOADING> {
    appIsLoading: boolean
}


export type SystemActions = IAppIsLoadingAction;