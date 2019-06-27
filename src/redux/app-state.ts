import { IUserState } from "./states/user.state";

/**
 * Estado general de la aplicación.
 * Tendrá
 * 1. El estado del usuarip
 */
export interface IAppState {
    userState: IUserState
}