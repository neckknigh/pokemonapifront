import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { clientService } from "../config/client.service";
import { urlProvider } from "../config/url.service";
import { requestAdapter } from "../adapter/request-adapter.service";
import { headersService } from "../authentication/headers.service";

class ComunityService {

    public getRecomendedComunities(): Observable<any> {
        return new Observable((observer: Observer<any>) => {

            clientService.post(
                urlProvider.get(urlProvider.URL_RECOMENDED_COMUNITIES),
                requestAdapter.getBodyForRecomendedComunities(),
                headersService.getHeaders()
            )
                .then(((response: any) => observer.next(response)))
                .catch((error: any) => observer.error(error))
                .finally(() => {
                    observer.complete();
                });
        });
    }
}

export const comunityService = new ComunityService();