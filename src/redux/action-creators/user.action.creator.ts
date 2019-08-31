import { UserConstants } from "../../services/constants.service";
import {
    IFacebookLoginRequestAction,
    UserActions,
    IFacebookUserRegisterRequestAction,
    IFacebookLoggedSucessAction,
    IAccountKitLoginRequestAction,
    IAccountKitLoggedSucessAction,
    IHasPendingRegistrationAction,
    ISignUpUserRequestAction,
    IAdminUser
} from "../actions/user.actions";
import { Account } from "../../models/account.model";
import { NullableString } from "../../types/types";

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
};

/**
 * Accion-creator de login de usuario con Account kit
 */
const startAccountKitLoginRequest = (): UserActions => {
    const accountKitLoginRequestAction: IAccountKitLoginRequestAction = {
        type: UserConstants.ACCOUNT_KIT_LOGIN_REQUEST
    }

    return accountKitLoginRequestAction;
};

/**
 * Accion-creator de inicio de registro de usuario
 * con datos de facebook.
 */
const startFacebookUserRegisterRequest = (): UserActions => {
    const facebookUserRegisterRequestAction: IFacebookUserRegisterRequestAction = {
        type: UserConstants.FACEBOOK_USER_REGISTER_REQUEST
    };
    return facebookUserRegisterRequestAction;
};

/**
 * Action-creator para guardar el estado se logueado
 * con facebook.
 * @param facebookLoggedIn true si el usuario se logueó correctamente
 *                         con facebook, false de otra forma.
 */
const setFacebookLoggedInStatus = (isFacebookLoggedIn: boolean): UserActions => {
    const facebookLoggedSucessAction: IFacebookLoggedSucessAction = {
        type: UserConstants.FACEBOOK_LOGIN_SUCCESS,
        isFacebookLoggedIn
    }

    return facebookLoggedSucessAction;
};

const setAccountKitLoggedInStatus = (isAccountKitLoggedIn: boolean): UserActions => {
    const accountKitLoggedInAction: IAccountKitLoggedSucessAction = {
        type: UserConstants.ACCOUNT_KIT_LOGIN_SUCCESS,
        isAccountKitLoggedIn
    };

    return accountKitLoggedInAction;
};

const setUserHasPendingRegistration = (hasPendingRegistration: boolean): UserActions => {
    const hasPendingRegistrationAction: IHasPendingRegistrationAction = {
        type: UserConstants.HAS_PENDING_REGISTRATION,
        hasPendingRegistration
    }

    return hasPendingRegistrationAction;
};

const startSignUpUserRequest = (userName: string, email: string): UserActions => {
    const signUpUserRequestAction: ISignUpUserRequestAction = {
        type: UserConstants.SIGNUP_USER_REQUEST,
        user: {
            userName,
            email
        }
    }
    return signUpUserRequestAction;
};

const setIsAdminUser = (isAdmin: NullableString): UserActions => {
    const setIsAdminUserAction: IAdminUser = {
        type: UserConstants.ADMIN_USER,
        isAdmin
    }
    return setIsAdminUserAction;
};


const saveUserInfo = (userInfo: Account): UserActions => {
    return {
        type: UserConstants.SAVE_USER_INFO,
        userInfo
    }
}

export const userActions = {
    startFacebookRequestlogin,
    startFacebookUserRegisterRequest,
    setFacebookLoggedInStatus,
    startAccountKitLoginRequest,
    setAccountKitLoggedInStatus,
    setUserHasPendingRegistration,
    startSignUpUserRequest,
    setIsAdminUser,
    saveUserInfo
}