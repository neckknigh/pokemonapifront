import { Action } from "redux";
import { AuthConstants } from "../../services/constants.service";
import { Account } from "../../models/account.model";

/**
 * Interface de la acción que se dispara
 * cuando el sistema termina de cargar el 
 * Account Kit SDK.
 */
export interface IAccountKitSDKDoneLoadingAction extends Action<AuthConstants.ACCOUNT_KIT_SDK_DONE_LOADING> {
    loadStatus: any
}

export interface IAccountKitLoginDoneAction extends Action<AuthConstants.ACCOUNT_KIT_LOGIN_DONE> { };

/**
 * Interface de la acción que se dispara
 * cuando se requiere almacenar el usuario de facebook
 * en el servidor.
 */
export interface ISaveFacebookUserAction extends Action<AuthConstants.SAVE_FACEBOOK_USER> {
    facebookUserData: any
}

/**
 * Interface de la acción que se dispara 
 * cuando se requiere validar el teléfono de un usuario.
 */
export interface IValidatePhoneUserAction extends Action<AuthConstants.VALIDATE_PHONE_USER> {
    user: Account
}

export type AuthActions = IAccountKitSDKDoneLoadingAction |
    IAccountKitLoginDoneAction |
    ISaveFacebookUserAction |
    IValidatePhoneUserAction;