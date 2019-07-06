import { AuthActions, IAccountKitSDKDoneLoadingAction } from "../actions/auth.actions";
import { AuthConstants } from "../../services/constants.service";

const doneAccountKitSdkLoading = (loadStatus: any): AuthActions => {
    //debugger;
    const accountKitSDKDoneLoadingAction: IAccountKitSDKDoneLoadingAction = {
        type: AuthConstants.ACCOUNT_KIT_SDK_DONE_LOADING,
        loadStatus
    };

    return accountKitSDKDoneLoadingAction;
}

export const authActions = {
    doneAccountKitSdkLoading
}