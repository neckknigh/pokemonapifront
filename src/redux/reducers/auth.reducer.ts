
import { Reducer } from "redux";
import { AuthConstants } from "../../services/constants.service";
import { IAuthState } from "../states/auth.state";
import { AuthActions } from "../actions/auth.actions";

// Estado inicial del usuario
const initialAuthState: IAuthState = {
    accountKitSDKLoaded: false,
    userHasSession: false,
    sessionBeingValidated: null
};

// root reducer
export const authReducer: Reducer<IAuthState, AuthActions> = (
    state: IAuthState = initialAuthState,
    action: AuthActions
): IAuthState => {

    // Se examina la acción
    switch (action.type) {

        // Si es la peticion del mecanismo de login informando que se cargó el SDK
        case AuthConstants.ACCOUNT_KIT_SDK_DONE_LOADING:
            return {
                ...state,
                accountKitSDKLoaded: action.loadStatus
            };

        case AuthConstants.USER_HAS_SESSION:
            return {
                ...state,
                userHasSession: action.hasSession
            }

        case AuthConstants.SESSION_BEING_VALIDATE:
            return {
                ...state,
                sessionBeingValidated: action.sessionBeingValidate
            }

        default:
            return state;
    }
};
