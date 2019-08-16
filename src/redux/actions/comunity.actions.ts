import { Action } from "redux";
import { ComunityConstants } from "../../services/constants.service";

export interface ILoadRecomendedComunitiesAction extends Action<ComunityConstants.LOAD_RECOMENDED_COMUNITIES> {

}

export type ComunityActions = ILoadRecomendedComunitiesAction;