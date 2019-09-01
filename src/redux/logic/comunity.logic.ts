import { createLogic } from "redux-logic";
import { ComunityConstants } from "../../services/constants.service";
import { comunityService } from "../../services/data/comunity.service";
import { Comunity } from "../../models/comunity.model";
import { comunityActions } from "../action-creators/comunity.action.creator";

const getRecomendedComunities = createLogic({
    type: ComunityConstants.LOAD_RECOMENDED_COMUNITIES,
    latest: true,
    // eslint-disable-next-line
    process({ },
        dispatch,
        done
    ) {
        comunityService.getRecomendedComunities()
            .subscribe(
                (comunities: Comunity[]) => {
                    dispatch(comunityActions.saveRecomendedComunities(comunities));
                }, error => {
                    console.log(error);
                    done();
                },
                () => {
                    done();
                }
            );
    }
});

const loadComunity = createLogic({
    type: ComunityConstants.LOAD_COMUNITY,
    latest: true,
    // eslint-disable-next-line
    process({ action }: any, dispatch, done) {
        comunityService.loadComunity(action.comunityId)
            .subscribe(
                (comunity: Comunity) => {
                    debugger;
                    dispatch(comunityActions.saveComunityLoaded(comunity));

                }, error => {
                    console.log(error);
                    done();
                },
                () => {
                    done();
                }
            );
    }
});

const comunityLogics = [
    getRecomendedComunities,
    loadComunity
];


export default comunityLogics;