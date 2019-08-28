import { createLogic } from "redux-logic";
import { ComunityConstants } from "../../services/constants.service";
import { comunityService } from "../../services/data/comunity.service";
import { Comunity } from "../../models/comunity.model";
import { comunityActions } from "../action-creators/comunity.action.creator";
import { ILoadComunityAction } from "../actions/comunity.actions";

const getRecomendedComunities = createLogic({
    type: ComunityConstants.LOAD_RECOMENDED_COMUNITIES,
    latest: true,
    // eslint-disable-next-line
    process({ action }, dispatch, done) {
        console.log(action);
        //debugger;

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

const loadComunity = createLogic<
    any,
    any,
    any,
    any,
    any,
    any,
    ILoadComunityAction
>({
    type: ComunityConstants.LOAD_COMUNITY,
    latest: true,
    // eslint-disable-next-line
    process({ action }, dispatch, done) {
        console.log("LoadComunity", action);
        //debugger;

        comunityService.loadComunity(action.comunityId)
            .subscribe(
                (comunities: Comunity) => {


                    console.log(comunities);

                }, error => {
                    console.log(error);
                    done();
                },
                () => {
                    done();
                }
            );

        done();

    }
});

const comunityLogics = [
    getRecomendedComunities,
    loadComunity
];


export default comunityLogics;