import { AuthActions, IAccountKitSDKDoneLoadingAction } from "../actions/auth.actions";
import { AuthConstants } from "../../services/constants.service";

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

export const authActions = {
    doneAccountKitSdkLoading,
    validateAccountKitLoginDone
}