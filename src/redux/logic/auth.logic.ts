import { createLogic } from 'redux-logic';
import { UserConstants, AuthConstants } from '../../services/constants.service';
import { authService } from '../../services/authentication/auth.service';
import { authActions } from '../action-creators/auth.action.creator';
import {
    IAccountKitSDKDoneLoadingAction,
    ISaveFacebookUserAction,
    IValidatePhoneUserAction,
    IUserHasSessionAction
} from '../actions/auth.actions';
import { Account } from '../../models/account.model';
import { userActions } from '../action-creators/user.action.creator';
import { ISignUpUserRequestAction } from '../actions/user.actions';
import { systemActions } from '../action-creators/system.action.creator';
import { accountService } from '../../services/data/account.service';
import { utilService } from '../../services/util.service';
import { IAuthState } from '../states/auth.state';
import { NullableString, ActionValidation } from '../../types/types';
import { ConfigProvider as CP } from '../../services/config/config.service';

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

        // Se registra al usuario en el sistema
        authService.saveFacebookUser(
            action.facebookUserData
        ).subscribe(
            (response: any) => {
                
                // Se crea la sessión
                authService.createSession(response);

                // Se indica se logueó correctamente
                dispatch(authActions.setUserLoggedInStatus("Y"));


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

        authService.validatePhoneUser(
            action.user
        ).subscribe(
            (response: any) => {
                debugger;

                if (response.status !== CP.get(CP.STATUS_OK)) {

                    
                    // Se indica si el usuario necesita completar su registro
                    dispatch(userActions.setUserHasPendingRegistration("Y"));

                    // Se indica que la sesión no está siendo validada
                    dispatch(authActions.setSessionBeingValidated("N"));


                }
                else {

                    // Se crea la sessión
                    authService.createSession(response);

                    // Se indica se logueó correctamente
                    dispatch(authActions.setUserLoggedInStatus("Y"));

                    dispatch(userActions.saveUserInfo(response.user));
                }

            }, error => {
                // TODO: Que hacer cuando falla el guardado del usuario?
                console.log(error);
                done();
            },
            () => {
                done();
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

        authService.signUpUser(
            action.user
        ).subscribe(
            (response: any) => {
                //debugger;

                if (response.status !== CP.get(CP.STATUS_OK)) {
                    dispatch(systemActions.handleAppError(response.msg));
                }
                else {
                    //debugger;
                     // Se crea la sessión
                     authService.createSession(response);

                    // TODO: Refactorizar esta lógica, arriba está repetida.
                    // Se actualiza el estado de logueado.
                    dispatch(authActions.setUserLoggedInStatus("Y"));

                    // Se indica que el usuario no tiene pendiente un registro
                    dispatch(userActions.setUserHasPendingRegistration("N"));
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
    validate(
        { getState, action }: ActionValidation,
        allow,
        reject
    ) {
        //debugger;
        const { authState }: { authState: IAuthState } = getState();

        /**
         * Si la sessión ya está siendo validada
         * o ya fué iniciada.
         * se rechazan nuevas acciones de validación.
         */
        if (authState.sessionBeingValidated === "Y" || authState.userHasSession === "Y") {
            reject(action);
        }

        else {
            allow(action);
        }
    },
    // eslint-disable-next-line
    process({ }, dispatch, done) {

        //debugger;
        const userToken = authService.getToken();
        // const userToken = "123333";

        // Si existe un token
        if (!utilService.isEmpty(userToken)) {

            dispatch(authActions.setSessionBeingValidated("Y"));

            // Se consutan sus datos
            accountService.getAccount(
                authService.getUserId()
            ).subscribe(
                (account: Account) => {
                    //debugger;

                    // No se encontró usuario con ese ID
                    const userExist = !utilService.isEmpty(account);

                    if (userExist) {


                        // Se guarda la data del usuario
                        dispatch(userActions.saveUserInfo(account));

                        // Se actualiza el estado de logueado.
                        dispatch(authActions.setUserLoggedInStatus("Y"));

                    }

                }, error => {
                    // TODO: Que hacer cuando falla el guardado del usuario?
                    console.log(error);
                    dispatch(authActions.setSessionBeingValidated("N"));
                    done();
                },
                () => {
                    done();
                }
            );
        }
        else {
            // Se actualiza el estado de sin loguear.
            dispatch(authActions.setUserLoggedInStatus("N"));
            done();
        }

    }
});

/**
 * Lógica que intercepta la acción enviada para marcar al usuario
 * como logueado.
 */
export const setLoggedInStatus = createLogic({
    type: AuthConstants.USER_HAS_SESSION,
    latest: true,
    // eslint-disable-next-line
    process({ action }: { action: IUserHasSessionAction }, dispatch, done) {
        let isAdminUser: NullableString = null;
        //debugger;
        if (action.hasSession === "Y") {

            // Se indica si el usuario es admin
            isAdminUser = authService.IsAdminUser();
            dispatch(userActions.setIsAdminUser(isAdminUser));

            // Se abre el menú lateral
            dispatch(systemActions.openSideMenu(isAdminUser === "Y"));
        }

        // Se indica que la sesión no está siendo validada.
        dispatch(authActions.setSessionBeingValidated("N"));
        done();
    }
});

/**
 * Lógica que intercepta la acción enviada para marcar al usuario
 * como logueado.
 */
export const destroySession = createLogic({
    type: AuthConstants.DESTROY_SESSION,
    latest: true,
    // eslint-disable-next-line
    process({ }, dispatch, done) {

        authService.destroySession();
        dispatch(authActions.setUserLoggedInStatus("N"));
        done();
    }
});

const authLogics = [
    loadAccountKitApiLogic,
    doAccountKitLogin,
    validateAccountKitLoginDone,
    saveFacebookUser,
    validatePhoneUser,
    signUpUser,
    validateUserSession,
    setLoggedInStatus,
    destroySession
];


export default authLogics;