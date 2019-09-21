import { createLogic } from "redux-logic";
import { SystemConstants } from "../../services/constants.service";
import { systemActions } from "../action-creators/system.action.creator";
import { IHandleAppErrorAction } from "../actions/system.actions";
import 'rxjs/add/observable/forkJoin';
import { Observable } from "rxjs/Observable";
import { comunityService } from "../../services/data/comunity.service";
import { promotionService } from "../../services/data/promotion.service";
import { comunityActions } from "../action-creators/comunity.action.creator";
import { promotionActions } from "../action-creators/promotion.action.creator";

/**
 * Permite establecer un mensaje de error en la aplicación.
 */
const handleAppError = createLogic<
    any,
    any,
    any,
    any,
    any,
    any,
    IHandleAppErrorAction
>({
    type: SystemConstants.HANDLE_APP_ERROR,
    latest: true,
    process({ action }, dispatch, done) {
        dispatch(systemActions.setAppWithError(action.appHasError));
        dispatch(systemActions.setAppErrorMessage(action.appErrorMessage));
        done();
    }
});

/**
 * Permite cargar la data principal simulando una sola
 * petición.
 */
const loadMainData = createLogic({
    type: SystemConstants.LOAD_MAIN_DATA,
    latest: true,
    process({ action }, dispatch, done) {
        
        Observable.forkJoin(
			comunityService.getPopularComunities(),
            comunityService.getRecomendedComunities(),
            promotionService.getPromotions()
		).subscribe(
			(response: any[]) => {
                const [ popularComunities, recomendedComunities, promotions ] = response;

                dispatch(comunityActions.savePopularComunities(popularComunities));
                dispatch(comunityActions.saveRecomendedComunities(recomendedComunities));
                dispatch(promotionActions.savePromotions(promotions));

                done();
			}
		);
    }
});

const systemLogics = [
    handleAppError,
    loadMainData
];

export default systemLogics;