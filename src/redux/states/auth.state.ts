import { NullableString } from "../../types/types";

export interface IAuthState {
    readonly accountKitSDKLoaded: boolean;
    readonly userHasSession: NullableString;
    readonly sessionBeingValidated: NullableString;
}