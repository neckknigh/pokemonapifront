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
export interface ISaveLoggedUserAction extends Action<UserConstants.LOGIN_SUCCESS> { }

// Se exporta el tipo con las dos acciones
export type UserActions = IFacebookLoginRequestAction | ISaveLoggedUserAction;