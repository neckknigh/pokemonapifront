import { createLogic } from 'redux-logic';
import { UserConstants, AuthConstants } from '../../services/constants.service';
import { authService } from '../../services/auth.service';
import { authActions } from '../action-creators/auth.action.creator';
import { IAccountKitSDKDoneLoadingAction } from '../actions/auth.actions';
export const loadAccountKitApiLogic = createLogic({
    type: UserConstants.ACCOUNT_KIT_LOGIN_REQUEST,
    latest: true,
    processOptions: {
        dispatchReturn: true,
        successType: authActions.doneAccountKitSdkLoading,
        failType: authActions.doneAccountKitSdkLoading
    },
    // eslint-disable-next-line
    async process({ }, dispatch, done) {
        const accountKitLoaded = await authService.loadAccountKitSDK()
            .then(response => response);
        done();
        return accountKitLoaded;
    }
});

export const doAccountKitLogin = createLogic<
    any,
    any,
    any,
    any,
    any,
    any,
    IAccountKitSDKDoneLoadingAction
>({
    type: AuthConstants.ACCOUNT_KIT_SDK_DONE_LOADING,
    latest: true,
    validate({ action }, allow) {

        // Si se cargó el SDK correctamte
        if (action.loadStatus) {
            allow(action);
            // LLamar al account kit
        }
        else {
            // Mostrar mensaje de error?
        }
    }
});

const authLogics = [
    loadAccountKitApiLogic,
    doAccountKitLogin
];


export default authLogics;