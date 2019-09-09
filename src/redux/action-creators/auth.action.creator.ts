import { AuthActions } from "../actions/auth.actions";
import { AuthConstants } from "../../services/constants.service";
import { Account } from "../../models/account.model";
import { NullableString } from "../../types/types";

class AuthActionCreator {

    public doneAccountKitSdkLoading(loadStatus: any): AuthActions {
        return {
            type: AuthConstants.ACCOUNT_KIT_SDK_DONE_LOADING,
            loadStatus
        };
    }

    public validateAccountKitLoginDone(): AuthActions {
        return {
            type: AuthConstants.ACCOUNT_KIT_LOGIN_DONE
        }
    }

    /**
    * Action-creator para lanzar la acción de registro del
    * usuario de facebook en el servidor.
    * @param facebookUserData 
    */
    public saveFacebookUser(facebookUser: Account): AuthActions {
        debugger;
        return {
            type: AuthConstants.SAVE_FACEBOOK_USER,
            facebookUser
        }
    }


    /**
    * Action-creator para lanzar la acción de validación
    * del teléfono del usuario.
    */
    public startValidatingPhoneUser(user: Account): AuthActions {
        return {
            type: AuthConstants.VALIDATE_PHONE_USER,
            user
        }
    }

    /**
    * Action-creator para lanzar la acción de establecimiento
    * de estado de logueado del usuario.
    */
    public setUserLoggedInStatus(hasSession: NullableString): AuthActions {
        return {
            type: AuthConstants.USER_HAS_SESSION,
            hasSession
        }
    }

    public validateUserSession(): AuthActions {
        return {
            type: AuthConstants.VALIDATE_USER_SESSION
        }
    };

    public setSessionBeingValidated(sessionBeingValidate: string): AuthActions {
        return {
            type: AuthConstants.SESSION_BEING_VALIDATE,
            sessionBeingValidate
        }
    }

    public destroySession(): AuthActions {
        return {
            type: AuthConstants.DESTROY_SESSION
        }
    }

}

export const authActions = new AuthActionCreator();