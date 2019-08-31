import { createLogic } from 'redux-logic';
import { UserConstants, AuthConstants } from '../../services/constants.service';
import { authService } from '../../services/authentication/auth.service';
import { authActions } from '../action-creators/auth.action.creator';
import {
    IAccountKitSDKDoneLoadingAction,
    ISaveFacebookUserAction,
    IValidatePhoneUserAction,
    AuthActions
} from '../actions/auth.actions';
import { Account } from '../../models/account.model';
import { userActions } from '../action-creators/user.action.creator';
import { ISignUpUserRequestAction } from '../actions/user.actions';
import { systemActions } from '../action-creators/system.action.creator';
import { accountService } from '../../services/data/account.service';
import { utilService } from '../../services/util.service';
import { IAppState } from '../app-state';
import { IAuthState } from '../states/auth.state';

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

        authService.validatePhoneUser(
            action.user
        ).subscribe(
            (response: any) => {
                debugger;
                let isAdminUser = false;

                if (response.status !== 1) {
                    // Se indica si el usuario necesita completar su registro
                    dispatch(userActions.setUserHasPendingRegistration(true));
                }
                else {

                    // Se crea la sessión
                    authService.createSession(response);


                    isAdminUser = authService.IsAdminUser();

                    // Se establece si el usuario es administrador
                    dispatch(userActions.setIsAdminUser(isAdminUser));

                    // Se indica se logueó correctamente
                    dispatch(authActions.setUserLoggedInStatus(true));

                    // Se indica que la sesión no está siendo validada
                    dispatch(authActions.setSessionBeingValidated("N"));

                    // Se abre el menú lateral
                    dispatch(systemActions.openSideMenu(isAdminUser));
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

        console.log("llego la acción", action);

        authService.signUpUser(
            action.user
        ).subscribe(
            (response: any) => {
                const { data } = response;

                if (data.status !== 1) {
                    dispatch(systemActions.handleAppError(data.msg));
                }
                else {

                    // TODO: Refactorizar esta lógica, arriba está repetida.

                    // Se indica que el usuario no tiene pendiente un registro
                    dispatch(userActions.setUserHasPendingRegistration(false));

                    // Se indica se logueó correctamente
                    dispatch(authActions.setUserLoggedInStatus(true));

                    // Se crea la sessión
                    authService.createSession(response);

                    // Se establece si el usuario es administrador
                    dispatch(userActions.setIsAdminUser(authService.IsAdminUser()));
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
        { getState, action }: { getState: () => IAppState, action: AuthActions },
        allow,
        reject
    ) {
        debugger;
        const { authState }: { authState: IAuthState } = getState();

        /**
         * Si la sessión ya está siendo validada
         * o ya fué iniciada.
         * se rechazan nuevas acciones de validación.
         */
        if (authState.sessionBeingValidated === "Y" || authState.userHasSession) {
            reject(action);
        }

        else {
            allow(action);
        }
    },
    // eslint-disable-next-line
    process({ }, dispatch, done) {

        debugger;
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
                    debugger;

                    // No se encontró usuario con ese ID
                    const userExist = !utilService.isEmpty(account);
                    let isAdminUser = false;

                    if (userExist) {

                        // Se actualiza el estado de logueado.
                        dispatch(authActions.setUserLoggedInStatus(true));


                        dispatch(authActions.setSessionBeingValidated("N"));


                        /**
                         * TODO: cuando se establezca la sesión, 
                         * lanzar automaticamente setSessionBeingValidated("N")
                         * systemActions.openSideMenu(isAdminUser)
                         */

                        /**
                         * Después de consultar al usuario, 
                         * se establece su rol de admin, si lo tiene.
                         */
                        isAdminUser = authService.IsAdminUser();
                        dispatch(userActions.setIsAdminUser(isAdminUser));


                        // Se abre el menú lateral
                        dispatch(systemActions.openSideMenu(isAdminUser));

                        // Se guarda la data del usuario
                        dispatch(userActions.saveUserInfo(account));
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
            dispatch(authActions.setSessionBeingValidated("N"));
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