import { AuthActions } from "./actions/auth.actions";
import { SystemActions } from "./actions/system.actions";
import { UserActions } from "./actions/user.actions";

export type AppActions = AuthActions |
    SystemActions |
    UserActions;