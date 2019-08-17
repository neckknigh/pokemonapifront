import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { clientService } from "../config/client.service";
import { urlProvider } from "../config/url.service";
import { requestAdapter } from "../adapter/request-adapter.service";
import { headersService } from "../authentication/headers.service";
import { responseAdapter } from "../adapter/response-adapter.service";
import { Promotion } from "../../models/promotion.model";

class PromotionService {

    public getPromotions(): Observable<Promotion[]> {
        return new Observable((observer: Observer<Promotion[]>) => {

            clientService.post(
                urlProvider.get(urlProvider.URL_PROMOTIONS),
                requestAdapter.getBodyForPromotions(),
                headersService.getHeaders()
            )
                .then(((response: any) => observer.next(responseAdapter.adaptPromotionsForPromotions(response))))
                .catch((error: any) => observer.error(error))
                .finally(() => {
                    observer.complete();
                });
        });
    }
}

export const promotionService = new PromotionService();