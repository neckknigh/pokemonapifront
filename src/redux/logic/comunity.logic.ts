import { createLogic } from "redux-logic";
import { ComunityConstants } from "../../services/constants.service";
import { comunityService } from "../../services/data/comunity.service";

const getRecomendedComunities = createLogic({
    type: ComunityConstants.LOAD_RECOMENDED_COMUNITIES,
    latest: true,
    // eslint-disable-next-line
    process({ action }, dispatch, done) {
        console.log(action);
        debugger;

        comunityService.getRecomendedComunities()
            .subscribe(
                (response: any) => {
                    debugger
                }, error => {
                    console.log(error);
                    debugger
                    done();
                },
                () => {
                    console.log("Get accountKit User");
                    done();
                }
            );
    }
});

const comunityLogics = [
    getRecomendedComunities
];


export default comunityLogics;