import { Action } from "redux";
import { PromotionsConstants } from "../../services/constants.service";
import { Promotion } from "../../models/promotion.model";

export interface ILoadPromotionsAction extends Action<PromotionsConstants.LOAD_PROMOTIONS> {
}

export interface ISavePromotionsAction extends Action<PromotionsConstants.SAVE_PROMOTIONS> {
    promotions: Promotion[];
}

export type PromotionsActions = ILoadPromotionsAction |
    ISavePromotionsAction;