
import { Reducer } from "redux";
import { SystemConstants } from "../../services/constants.service";
import { ISystemState } from "../states/system.state";
import { SystemActions } from "../actions/system.actions";

// Estado inicial del sistema
const initialSystemState: ISystemState = {
    isAppLoading: false
};

// root reducer
export const systemReducer: Reducer<ISystemState, SystemActions> = (
    state: ISystemState = initialSystemState,
    action: SystemActions
): ISystemState => {

    // Se examina la acción
    switch (action.type) {

        // Si es la acción que modifica el estado de la pantalla de carga
        case SystemConstants.APP_IS_LOADING:
            return {
                ...state,
                isAppLoading: action.appIsLoading
            };

        default:
            return state;
    }
};
