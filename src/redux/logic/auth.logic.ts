import { createLogic } from 'redux-logic';
import { UserConstants, AuthConstants } from '../../services/constants.service';
import { authService } from '../../services/authentication/auth.service';
import { authActions } from '../action-creators/auth.action.creator';
import { IAccountKitSDKDoneLoadingAction, ISaveFacebookUserAction, IValidatePhoneUserAction } from '../actions/auth.actions';
import { Account } from '../../models/account.model';
import { userActions } from '../action-creators/user.action.creator';
import { ISignUpUserRequestAction } from '../actions/user.actions';

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
    // eslint-disable-next-line
    process({ }, dispatch, done) {
        //debugger;

        authService.getAccountKitUser()
            .subscribe(
                (userAccount: Account) => {
                    //debugger;
                    console.log(userAccount);
                    dispatch(authActions.startValidatingPhoneUser(userAccount));
                }, error => {
                    // TODO: Que hacer cuando el usuario falla el logueo?
                    console.log(error);
                    done();
                },
                () => {
                    console.log("Get accountKit User");
                    done();
                }
            );

    }
});

/**
 * Permite guardar los datos obtenidos del
 * usuario de facebook en base de datos
 */
export const saveFacebookUser = createLogic<
    any,
    any,
    any,
    any,
    any,
    any,
    ISaveFacebookUserAction
>({
    type: AuthConstants.SAVE_FACEBOOK_USER,
    latest: true,
    // eslint-disable-next-line
    process({ action }, dispatch, done) {
        //debugger;

        authService.saveFacebookUser(
            action.facebookUserData
        ).subscribe(
            (response: any) => {
                console.log(response);

                done();

            }, error => {
                // TODO: Que hacer cuando falla el guardado del usuario?
                console.log(error);
                done();
            },
            () => {
                console.log("Facebook user saved");
            }
        );
    }
});

/**
 * Permite validar si el teléfono del usuario
 * ya se encuentra registrado en el sistema.
 */
export const validatePhoneUser = createLogic<
    any,
    any,
    any,
    any,
    any,
    any,
    IValidatePhoneUserAction
>({
    type: AuthConstants.VALIDATE_PHONE_USER,
    latest: true,
    // eslint-disable-next-line
    process({ action }, dispatch, done) {

        console.log("llego validatePhoneUser", action);
        let hasPendingRegistration = false;

        authService.validatePhoneUser(
            action.user
        ).subscribe(
            (response: any) => {
                debugger;
                console.log(response);

                if (response.status !== 1) {
                    hasPendingRegistration = true;
                }
                else {
                    // Se indica que el usuario se logueó correctamente
                    dispatch(
                        userActions.setAccountKitLoggedInStatus(true)
                    );
                }

                // Se indica si el usuario necesita completar su registro
                dispatch(
                    userActions.setUserHasPendingRegistration(
                        hasPendingRegistration
                    )
                );

                done();

            }, error => {
                // TODO: Que hacer cuando falla el guardado del usuario?
                console.log(error);
                done();
            },
            () => {
                console.log("Phone user Validated");
            }
        );
    }
});

/**
 * Permite validar si el teléfono del usuario
 * ya se encuentra registrado en el sistema.
 */
export const signUpUser = createLogic<
    any,
    any,
    any,
    any,
    any,
    any,
    ISignUpUserRequestAction
>({
    type: UserConstants.SIGNUP_USER_REQUEST,
    latest: true,
    // eslint-disable-next-line
    process({ action }, dispatch, done) {

        console.log("llego la acción", action);

        authService.signUpUser(
            action.user
        ).subscribe(
            (response: any) => {
                const hasSession = true;
                console.log(response);

                dispatch(userActions.setUserHasPendingRegistration(!hasSession));

                // TODO: Enviar señal de redireción
                dispatch(authActions.setUserLoggedInStatus(hasSession));

            }, error => {
                // TODO: Que hacer cuando falla el guardado del usuario?
                console.log(error);
                done();
            },
            () => {
                console.log("Phone user Validated");
                done();
            }
        );
    }
});

const authLogics = [
    loadAccountKitApiLogic,
    doAccountKitLogin,
    validateAccountKitLoginDone,
    saveFacebookUser,
    validatePhoneUser,
    signUpUser
];


export default authLogics;