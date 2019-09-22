import { SystemConstants } from "../../services/constants.service";
import { SystemActions } from "../actions/system.actions";

class SystemActionCreator {

    /**
     * Action-creator para lanzar la acción de validación
     * del teléfono del usuario.
     */
    public setLoadingAppStatus(appIsLoading: boolean): SystemActions {
        return {
            type: SystemConstants.APP_IS_LOADING,
            appIsLoading
        };
    }

    public showLoadingScreen(): SystemActions {
        return this.setLoadingAppStatus(true);
    }

    public hideLoadingScreen(): SystemActions {
        return this.setLoadingAppStatus(false);
    }

    public setAppWithError(appHasError: boolean): SystemActions {
        return {
            type: SystemConstants.APP_HAS_ERROR,
            appHasError
        };
    }

    public setAppErrorMessage(errorMessage: string): SystemActions {
        return {
            type: SystemConstants.APP_ERROR_MESSAGE,
            errorMessage
        };
    }

    public handleAppError(
        appErrorMessage: string = "",
        appHasError: boolean = true
    ): SystemActions {
        return {
            type: SystemConstants.HANDLE_APP_ERROR,
            appErrorMessage,
            appHasError
        };
    }

    public openSideMenu(openSideMenu: boolean): SystemActions {
        return {
            type: SystemConstants.OPEN_SIDE_MENU,
            openSideMenu
        };
    }

    public loadMainData(): SystemActions {
        return {
            type: SystemConstants.LOAD_MAIN_DATA
        };
    }

    public getCurrentLocation(): SystemActions {
        return {
            type: SystemConstants.GET_CURRENT_LOCATION
        };
    }
}

export const systemActions = new SystemActionCreator();