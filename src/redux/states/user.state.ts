export interface IUserState {

    // Indica si se logueó o no
    readonly isLoggedIn: boolean,

    // indica que está logueandose
    readonly isFacebookLogginIn: boolean,

    // indica que se logueó con facebook correctamente
    readonly isFacebookLoggedIn?: boolean,

    // indica que está logueandose con account kit
    readonly isAccountKitLogginIn: boolean
}