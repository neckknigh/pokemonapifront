import { ComunityActions } from "../actions/comunity.actions";
import { ComunityConstants } from "../../services/constants.service";
import { Comunity } from "../../models/comunity.model";

const loadRecomendedComunities = (): ComunityActions => {
    return {
        type: ComunityConstants.LOAD_RECOMENDED_COMUNITIES
    };
};

const saveRecomendedComunities = (recomendedComunities: Comunity[]): ComunityActions => {
    return {
        type: ComunityConstants.SAVE_RECOMENDED_COMUNITIES,
        recomendedComunities
    }
}


export const comunityActions = {
    loadRecomendedComunities,
    saveRecomendedComunities
}