import { Action } from "redux";
import { ComunityConstants } from "../../services/constants.service";
import { Comunity } from "../../models/comunity.model";

export interface ILoadRecomendedComunitiesAction extends Action<ComunityConstants.LOAD_RECOMENDED_COMUNITIES> {

}

export interface ISaveRecomendedComunitiesAction extends Action<ComunityConstants.SAVE_RECOMENDED_COMUNITIES> {
    recomendedComunities: Comunity[];
}

export type ComunityActions = ILoadRecomendedComunitiesAction |
    ISaveRecomendedComunitiesAction;