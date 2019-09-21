import { createLogic } from "redux-logic";
import { PromotionsConstants } from "../../services/constants.service";
import { promotionService } from "../../services/data/promotion.service";
import { Promotion } from "../../models/promotion.model";
import { promotionActions } from "../action-creators/promotion.action.creator";

// TODO: Esto no se está usando, revisar si quitarlo.
const getPromotions = createLogic({
    type: PromotionsConstants.LOAD_PROMOTIONS,
    latest: true,
    // eslint-disable-next-line
    process({ action }, dispatch, done) {
        console.log(action);

        promotionService.getPromotions()
            .subscribe(
                (promotions: Promotion[]) => {
                    dispatch(promotionActions.savePromotions(promotions));
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

const promotionLogics = [
    getPromotions
];


export default promotionLogics;