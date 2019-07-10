import { AuthActions, IAccountKitSDKDoneLoadingAction } from "../actions/auth.actions";
import { AuthConstants } from "../../services/constants.service";
import { ReactFacebookLoginInfo } from "react-facebook-login";

const doneAccountKitSdkLoading = (loadStatus: any): AuthActions => {
    //debugger;
    const accountKitSDKDoneLoadingAction: IAccountKitSDKDoneLoadingAction = {
        type: AuthConstants.ACCOUNT_KIT_SDK_DONE_LOADING,
        loadStatus
    };

    return accountKitSDKDoneLoadingAction;
};

const validateAccountKitLoginDone = (): AuthActions => {
    return {
        type: AuthConstants.ACCOUNT_KIT_LOGIN_DONE
    }
}

/**
 * Action-creator para lanzar la acción de registro del
 * usuario de facebook en el servidor.
 * @param facebookUserData 
 */
const saveFacebookUser = (facebookUserData: ReactFacebookLoginInfo): AuthActions => {
    return {
        type: AuthConstants.SAVE_FACEBOOK_USER,
        facebookUserData
    }
}

export const authActions = {
    doneAccountKitSdkLoading,
    validateAccountKitLoginDone,
    saveFacebookUser
}