import { ComunityActions } from "../actions/comunity.actions";
import { ComunityConstants } from "../../services/constants.service";
import { Comunity } from "../../models/comunity.model";

class ComunityActionCreator {

    public loadRecomendedComunities(): ComunityActions {
        return {
            type: ComunityConstants.LOAD_RECOMENDED_COMUNITIES
        };
    }

    public saveRecomendedComunities(recomendedComunities: Comunity[]): ComunityActions {
        return {
            type: ComunityConstants.SAVE_RECOMENDED_COMUNITIES,
            recomendedComunities
        }
    }

    public loadComunity(comunityId: string): ComunityActions {
        return {
            type: ComunityConstants.LOAD_COMUNITY,
            comunityId
        }
    }
}


export const comunityActions = new ComunityActionCreator();