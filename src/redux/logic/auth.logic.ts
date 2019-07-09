import { createLogic } from 'redux-logic';
import { UserConstants, AuthConstants } from '../../services/constants.service';
import { authService } from '../../services/auth.service';
import { authActions } from '../action-creators/auth.action.creator';
import { IAccountKitSDKDoneLoadingAction } from '../actions/auth.actions';
import { Account } from '../../models/account.model';

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

// TODO: Si falla la carga del sdk del account kit que hacemos?
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

/**
 * Permite validar si el usuario realizó corectamente el login
 * utilizando el account kit.
 */
export const validateAccountKitLoginDone = createLogic({
    type: AuthConstants.ACCOUNT_KIT_LOGIN_DONE,
    latest: true,
    validate({ action }, allow) {
        //debugger;

        // TODO: Mover esto al process?
        authService.getAccountKitUser()
            .subscribe(
                (userAccount: Account) => {
                    console.log(userAccount);

                    // TODO: Después de obtener los datos, mandar una accion 
                    // para registralos

                    // Remover esto:
                    localStorage.setItem("user", JSON.stringify(userAccount));
                    window.location.href = "/comunities";


                }, error => {
                    // TODO: Que hacer cuando el usuario falla el logueo?
                    console.log(error);
                },
                () => {
                    console.log("Get accountKit User");
                }
            );
    }
});



const authLogics = [
    loadAccountKitApiLogic,
    doAccountKitLogin,
    validateAccountKitLoginDone
];


export default authLogics;