import { UserConstants } from "../../services/constants.service";
import { IFacebookLoginRequestAction, UserActions, IFacebookUserRegisterRequestAction, IFacebookLoggedSucessAction } from "../actions/user.actions";

/**
 * Accion-creators para el usuario.
 */

/**
 * Accion-creator de inicio de login con facebook
 */
const startFacebookRequestlogin = (): UserActions => {
    const facebookLoginRequestAction: IFacebookLoginRequestAction = {
        type: UserConstants.FACEBOOK_LOGIN_REQUEST
    };
    return facebookLoginRequestAction;
}

/**
 * Accion-creator de inicio de registro de usuario
 * con datos de facebook.
 */
const startFacebookUserRegisterRequest = (): UserActions => {
    const facebookUserRegisterRequestAction: IFacebookUserRegisterRequestAction = {
        type: UserConstants.FACEBOOK_USER_REGISTER_REQUEST
    };
    return facebookUserRegisterRequestAction;
}

/**
 * Action-creator para guardar el estado se logueado
 * con facebook.
 * @param facebookLoggedIn true si el usuario se logueó correctamente
 *                         con facebook, false de otra forma.
 */
const setFacebookLoggedInStatus = (facebookLoggedIn: boolean): UserActions => {
    const facebookLoggedSucessAction: IFacebookLoggedSucessAction = {
        type: UserConstants.FACEBOOK_LOGIN_SUCCESS,
        isFacebookLoggedIn: facebookLoggedIn
    }

    return facebookLoggedSucessAction;
}

export const userActions = {
    startFacebookRequestlogin,
    startFacebookUserRegisterRequest,
    setFacebookLoggedInStatus
}