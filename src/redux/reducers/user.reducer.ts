
import { IUserState } from "../states/user.state";
import { UserActions } from "../actions/user.actions";
import { Reducer } from "redux";
import { UserConstants } from "../../services/constants.service";

// Estado inicial del usuario
const initialUserState: IUserState = {
    isLoggedIn: false,
    isFacebookLogginIn: false,
    isAccountKitLogginIn: false
};

// root reducer
export const userReducer: Reducer<IUserState, UserActions> = (
    state: IUserState = initialUserState,
    action: UserActions
): IUserState => {

    // Se examina la acción
    switch (action.type) {
        // Si es la peticion del usuario de iniciar el proceso de login
        case UserConstants.FACEBOOK_LOGIN_REQUEST:
            return {
                ...state,
                isFacebookLogginIn: true
            };

        /**
         * Se actualiza el estado que indica que el usuario
         * se loguéo con facebook correctamente.
         */
        case UserConstants.FACEBOOK_LOGIN_SUCCESS:
            return {
                ...state,
                isFacebookLoggedIn: action.isFacebookLoggedIn,
                isFacebookLogginIn: false
            }

        case UserConstants.ACCOUNT_KIT_LOGIN_REQUEST:
            return {
                ...state,
                isAccountKitLogginIn: true
            }

        default:
            return state;
    }
};
