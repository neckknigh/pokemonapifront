export interface IAuthState {
    readonly accountKitSDKLoaded: boolean;
    readonly userHasSession: boolean;
    readonly sessionBeingValidated: string | null;
}