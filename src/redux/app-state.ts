import { IUserState } from "./states/user.state";
import { IAuthState } from "./states/auth.state";

/**
 * Estado general de la aplicación.
 * Tendrá
 * 1. El estado del usuario.
 * 2. El Estado del mecanismo del login
 */
export interface IAppState {
    userState: IUserState,
    authState: IAuthState
}