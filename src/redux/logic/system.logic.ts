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
import { locationService } from "../../services/data/location.service";
import { ConfigProvider as CP } from "../../services/config/config.service";

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
    // eslint-disable-next-line
    process({}, dispatch, done) {
        
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

                /**
                 * Después de consultada la información principal,
                 * se soliicta al usuario su posición.
                 */
                setTimeout(() => {
                    dispatch(systemActions.getCurrentLocation());
                    done();
                }, CP.get(CP.TIME_FOR_LOCATION));

			}, error => {
                console.log(error);
                done();
            }
		);
    }
});

const getCurrentLocation = createLogic({
    type: SystemConstants.GET_CURRENT_LOCATION,
    latest: true,
    // eslint-disable-next-line
    process({}, dispatch, done) {
        
        locationService.getCurrentLocation().subscribe(
            (response: Position) => {
                console.log(response);
                done();
            }, error => {
                console.log(error);
                done();
            }
        );
    }
});

const systemLogics = [
    handleAppError,
    loadMainData,
    getCurrentLocation
];

export default systemLogics;