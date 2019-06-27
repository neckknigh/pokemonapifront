import { UserConstants } from "../../services/constants.service";
import { IFacebookLoginRequestAction, UserActions } from "../actions/user.actions";

// 
const startFacebookRequestlogin = (): UserActions => {
    const facebookLoginRequestAction: IFacebookLoginRequestAction = {
        type: UserConstants.FACEBOOK_LOGIN_REQUEST
    };
    return facebookLoginRequestAction;
}

export const userActions = {
    startFacebookRequestlogin
}