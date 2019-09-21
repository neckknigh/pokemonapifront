import { Action } from "redux";
import { SystemConstants } from "../../services/constants.service";

/**
 * Interface de la acción que se dispara
 * cuando el sistema realiza algún tipo de procesamiento.
 */
export interface IAppIsLoadingAction extends Action<SystemConstants.APP_IS_LOADING> {
    appIsLoading: boolean;
}

export interface IAppHasErrorAction extends Action<SystemConstants.APP_HAS_ERROR> {
    appHasError: boolean;
}

export interface IAppErrorMessageAction extends Action<SystemConstants.APP_ERROR_MESSAGE> {
    errorMessage: string;
}

export interface IHandleAppErrorAction extends Action<SystemConstants.HANDLE_APP_ERROR> {
    appHasError: boolean;
    appErrorMessage: string;
}

export interface IOpenSideMenuAction extends Action<SystemConstants.OPEN_SIDE_MENU> {
    openSideMenu: boolean;
}

export interface ILoadMainDataAction extends Action<SystemConstants.LOAD_MAIN_DATA> {

}

export type SystemActions = IAppIsLoadingAction |
    IAppHasErrorAction |
    IAppErrorMessageAction |
    IHandleAppErrorAction |
    IOpenSideMenuAction |
    ILoadMainDataAction;