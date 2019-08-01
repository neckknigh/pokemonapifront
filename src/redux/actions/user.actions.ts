import { Action } from "redux";
import { UserConstants } from "../../services/constants.service";

/**
 * Interface de la acción que se dispara cuando 
 * el usuario intenta loguearse con facebook.
 */
export interface IFacebookLoginRequestAction extends Action<UserConstants.FACEBOOK_LOGIN_REQUEST> { }

/**
 * Interface de la acción que se dispara cuando
 * el usuario intenta loguearse con account kit
 */
export interface IAccountKitLoginRequestAction extends Action<UserConstants.ACCOUNT_KIT_LOGIN_REQUEST> { }

/**
 * Interface de la acción que se dispara cuando el usuario
 * realiza el login por facebook. 
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

/**
 * Interface de la acción que se dispara cuando el usuario
 * se ha logueado por la api de accountKit.
 */
export interface IAccountKitLoggedSucessAction extends Action<UserConstants.ACCOUNT_KIT_LOGIN_SUCCESS> {
    isAccountKitLoggedIn: boolean
}

/**
 * Interface de la acción que se dispara cuando el usuario
 * se logueó por account kit y requiere registro.
 */
export interface IHasPendingRegistrationAction extends Action<UserConstants.HAS_PENDING_REGISTRATION> {
    hasPendingRegistration: boolean
}

export interface ISignUpUserRequestAction extends Action<UserConstants.SIGNUP_USER_REQUEST> {
    user: any
}

export interface IAdminUser extends Action<UserConstants.ADMIN_USER> {
    isAdminUser: boolean
}

// Se exporta el tipo con las dos acciones
export type UserActions =
    IFacebookLoginRequestAction |
    IFacebookLoggedSucessAction |
    IFacebookUserRegisterRequestAction |
    IAccountKitLoginRequestAction |
    IAccountKitLoggedSucessAction |
    IHasPendingRegistrationAction |
    ISignUpUserRequestAction |
    IAdminUser;