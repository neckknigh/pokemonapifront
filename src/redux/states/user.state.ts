import { Account } from "../../models/account.model";
import { NullableString } from "../../types/types";

export interface IUserState {

    // Indica si se logueó o no
    readonly isLoggedIn: boolean;

    // indica que está logueandose
    readonly isFacebookLogginIn: boolean;

    // indica que se logueó con facebook correctamente
    readonly isFacebookLoggedIn?: boolean;

    // indica que está logueandose con account kit
    readonly isAccountKitLogginIn: boolean;

    // indica que se ha logueado con account kit
    readonly isAccountKitLoggedIn: boolean;

    // Indica si necesita completar el proceso de registro
    readonly pendingRegistration: boolean;

    // Indica si el usuario es administrador del sistema.
    readonly isAdmin: NullableString;

    // Datos básicos del usuario
    readonly userInfo: Account;
}