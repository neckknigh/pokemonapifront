import { createLogic } from 'redux-logic';
import { UserConstants, AuthConstants } from '../../services/constants.service';
import { authService } from '../../services/authentication/auth.service';
import { authActions } from '../action-creators/auth.action.creator';
import {
    IAccountKitSDKDoneLoadingAction,
    ISaveFacebookUserAction,
    IValidatePhoneUserAction
} from '../actions/auth.actions';
import { Account } from '../../models/account.model';
import { userActions } from '../action-creators/user.action.creator';
import { ISignUpUserRequestAction } from '../actions/user.actions';
import { systemActions } from '../action-creators/system.action.creator';
import { accountService } from '../../services/data/account.service';

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

        authService.getAccountKitUser()
            .subscribe(
                (userAccount: Account) => {
                    dispatch(authActions.startValidatingPhoneUser(userAccount));
                }, error => {
                    console.log(error);
                    dispatch(systemActions.handleAppError(error.msg));
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
        const isLoggedIn = true;

        // Se indica que se logueó correctamente por facebook
        dispatch(userActions.setFacebookLoggedInStatus(isLoggedIn));

        // Se registra al usuario en el sistema
        authService.saveFacebookUser(
            action.facebookUserData
        ).subscribe(
            (response: any) => {
                //debugger;
                console.log(response);

                // Se indica se logueó correctamente
                dispatch(authActions.setUserLoggedInStatus(isLoggedIn));

                // Se crea la sessión
                authService.createSession(response);

            }, error => {
                // TODO: Que hacer cuando falla el guardado del usuario?
                console.log(error);
                done();
            },
            () => {
                console.log("Facebook user saved");
                done();
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
        let hasPendingRegistration = false,
            isAdmin = false;

        authService.validatePhoneUser(
            action.user
        ).subscribe(
            (response: any) => {
                debugger;

                if (response.status !== 1) {
                    hasPendingRegistration = true;
                }
                else {

                    // Se indica que el usuario no tiene pendiente un registro
                    dispatch(userActions.setUserHasPendingRegistration(false));

                    // Se indica se logueó correctamente
                    dispatch(authActions.setUserLoggedInStatus(true));

                    // Se crea la sessión
                    authService.createSession(response);

                    isAdmin = authService.IsAdminUser();

                    // Se establece si el usuario es administrador
                    dispatch(userActions.setIsAdminUser(isAdmin));
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
                const { data } = response;

                if (data.status !== 1) {
                    dispatch(systemActions.handleAppError(data.msg));
                }
                else {
                    // Se indica que no tiene pendiente completar registro
                    dispatch(userActions.setUserHasPendingRegistration(!hasSession));

                    // Se indica que se logué correctamente.
                    dispatch(authActions.setUserLoggedInStatus(hasSession));

                    // Después de registrar al usuario se crea la sessión
                    authService.createSession(response);
                }


            }, error => {
                //debugger;
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

/**
 * Permite validar si el teléfono del usuario
 * ya se encuentra registrado en el sistema.
 */
export const validateUserSession = createLogic({
    type: AuthConstants.VALIDATE_USER_SESSION,
    latest: true,
    // eslint-disable-next-line
    process({ }, dispatch, done) {

        debugger;
        const userHasSession = authService.userHasSession();

        // Se actualiza el estado de logueado.
        dispatch(authActions.setUserLoggedInStatus(userHasSession));

        // Si el usuario tiene sesión
        if (userHasSession) {

            // Se consutan sus datos
            accountService.getAccount(
                authService.getUserId()
            ).subscribe(
                (account: Account) => {

                    /**
                     * Después de consultar al usuario, 
                     * se establece su rol de admin, si lo tiene.
                     */
                    dispatch(userActions.setIsAdminUser(authService.IsAdminUser()));


                }, error => {
                    // TODO: Que hacer cuando falla el guardado del usuario?
                    console.log(error);
                    done();
                },
                () => {
                    done();
                }
            );
        }
        else {
            done();
        }

    }
});

const authLogics = [
    loadAccountKitApiLogic,
    doAccountKitLogin,
    validateAccountKitLoginDone,
    saveFacebookUser,
    validatePhoneUser,
    signUpUser,
    validateUserSession
];


export default authLogics;