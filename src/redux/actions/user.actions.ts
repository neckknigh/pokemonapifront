import { Action } from "redux";
import { UserConstants } from "../../services/constants.service";

/**
 * Interface de la acción que se dispara cuando 
 * el usuario intenta loguearse con facebook.
 */
export interface IFacebookLoginRequestAction extends Action<UserConstants.FACEBOOK_LOGIN_REQUEST> { }

/**
 * Interface de la acción que se dispara cuando el usuario
 * realiza el login corectamente. 
 */
export interface IFacebookLoggedSucessAction extends Action<UserConstants.FACEBOOK_LOGIN_SUCCESS> {
    isFacebookLoggedIn: boolean
}

/**
 * Interface de la acción que se dispara cuando el usuario
 * inicia el proceso de registro en el servidor con los datos
 * de la api de facebook. 
 */
export interface IFacebookUserRegisterRequestAction extends Action<UserConstants.FACEBOOK_USER_REGISTER_REQUEST> { }

// Se exporta el tipo con las dos acciones
export type UserActions =
    IFacebookLoginRequestAction |
    IFacebookLoggedSucessAction |
    IFacebookUserRegisterRequestAction;