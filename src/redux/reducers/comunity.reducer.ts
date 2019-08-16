
import { Reducer } from "redux";
import { ComunityConstants } from "../../services/constants.service";
import { IComunityState } from "../states/comunity.state";
import { ComunityActions } from "../actions/comunity.actions";

// Estado inicial del usuario
const initialComunityState: IComunityState = {
    recomendedComunities: []
};

// root reducer
export const comunityReducer: Reducer<IComunityState, ComunityActions> = (
    state: IComunityState = initialComunityState,
    action: ComunityActions
): IComunityState => {

    // Se examina la acción
    switch (action.type) {

        case ComunityConstants.SAVE_RECOMENDED_COMUNITIES:
            return {
                ...state,
                recomendedComunities: action.recomendedComunities
            };

        default:
            return state;
    }
};
