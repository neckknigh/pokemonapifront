import { PromotionsActions } from "../actions/promotion.actions";
import { PromotionsConstants } from "../../services/constants.service";
import { Promotion } from "../../models/promotion.model";

const loadPromotions = (): PromotionsActions => {
    return {
        type: PromotionsConstants.LOAD_PROMOTIONS
    };
};

const savePromotions = (promotions: Promotion[]): PromotionsActions => {
    return {
        type: PromotionsConstants.SAVE_PROMOTIONS,
        promotions
    }
}

export const promotionActions = {
    loadPromotions,
    savePromotions
}