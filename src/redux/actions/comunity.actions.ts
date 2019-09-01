import { Action } from "redux";
import { ComunityConstants } from "../../services/constants.service";
import { Comunity } from "../../models/comunity.model";

export interface ILoadRecomendedComunitiesAction extends Action<ComunityConstants.LOAD_RECOMENDED_COMUNITIES> {

}

export interface ISaveRecomendedComunitiesAction extends Action<ComunityConstants.SAVE_RECOMENDED_COMUNITIES> {
    recomendedComunities: Comunity[];
}

export interface ILoadComunityAction extends Action<ComunityConstants.LOAD_COMUNITY> {
    comunityId: string;
}

export interface ISaveComunityLoaded extends Action<ComunityConstants.SAVE_COMUNITY_LOADED> {
    comunity: Comunity;
}

export type ComunityActions = ILoadRecomendedComunitiesAction |
    ISaveRecomendedComunitiesAction |
    ILoadComunityAction |
    ISaveComunityLoaded;