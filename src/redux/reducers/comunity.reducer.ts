
import { Reducer } from "redux";
import { ComunityConstants } from "../../services/constants.service";
import { IComunityState } from "../states/comunity.state";
import { ComunityActions } from "../actions/comunity.actions";

// Estado inicial del usuario
const initialComunityState: IComunityState = {
    recomendedComunities: [],
    comunityLoaded: null,
    popularComunities: []
};

// root reducer
export const comunityReducer: Reducer<IComunityState, ComunityActions> = (
    state: IComunityState = initialComunityState,
    action: ComunityActions
): IComunityState => {

    console.log("action is", action);
    // Se examina la acción
    switch (action.type) {

        case ComunityConstants.SAVE_RECOMENDED_COMUNITIES:
            return {
                ...state,
                recomendedComunities: action.recomendedComunities
            };

        case ComunityConstants.SAVE_COMUNITY_LOADED:
            debugger;
            return {
                ...state,
                comunityLoaded: action.comunity
            };

        case ComunityConstants.SAVE_POPULAR_COMUNITIES:
            return {
                ...state,
                popularComunities: action.popularComunities
            }

        default:
            return state;
    }
};
