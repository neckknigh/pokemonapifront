
import { Reducer } from "redux";
import { PromotionsConstants } from "../../services/constants.service";
import { IPromotionState } from "../states/promotion.state";
import { PromotionsActions } from "../actions/promotion.actions";

// Estado inicial del usuario
const initialPromotionState: IPromotionState = {
    promotions: []
};

// root reducer
export const promotionReducer: Reducer<IPromotionState, PromotionsActions> = (
    state: IPromotionState = initialPromotionState,
    action: PromotionsActions
): IPromotionState => {

    // Se examina la acción
    switch (action.type) {

        case PromotionsConstants.SAVE_PROMOTIONS:
            return {
                ...state,
                promotions: action.promotions
            };

        default:
            return state;
    }
};
