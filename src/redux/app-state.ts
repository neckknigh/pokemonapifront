import { IUserState } from "./states/user.state";
import { IAuthState } from "./states/auth.state";
import { ISystemState } from "./states/system.state";

/**
 * Estado general de la aplicación.
 * Tendrá
 * 1. El estado del usuario.
 * 2. El Estado del mecanismo del login.
 * 3. El estado general del sistema.
 */
export interface IAppState {
    userState: IUserState,
    authState: IAuthState,
    systemState: ISystemState
}