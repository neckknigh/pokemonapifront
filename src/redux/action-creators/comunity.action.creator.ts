import { ComunityActions } from "../actions/comunity.actions";
import { ComunityConstants } from "../../services/constants.service";

const loadRecomendedComunities = (): ComunityActions => {
    return {
        type: ComunityConstants.LOAD_RECOMENDED_COMUNITIES
    };
};


export const comunityActions = {
    loadRecomendedComunities
}