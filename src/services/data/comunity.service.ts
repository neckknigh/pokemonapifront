import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { clientService } from "../config/client.service";
import { urlProvider } from "../config/url.service";
import { requestAdapter } from "../adapter/request-adapter.service";
import { headersService } from "../authentication/headers.service";
import { responseAdapter } from "../adapter/response-adapter.service";
import { Comunity } from "../../models/comunity.model";

class ComunityService {

    public getRecomendedComunities(): Observable<Comunity[]> {
        return new Observable((observer: Observer<Comunity[]>) => {

            clientService.post(
                urlProvider.get(urlProvider.URL_RECOMENDED_COMUNITIES),
                requestAdapter.getBodyForRecomendedComunities(),
                headersService.getHeaders()
            )
                .then(((response: any) => observer.next(responseAdapter.adaptRecomendedComunitiesForComunities(response))))
                .catch((error: any) => observer.error(error))
                .finally(() => {
                    observer.complete();
                });
        });
    }

    /**
     * Permite consultar una comunidad por su id
     * @param {String} id id de la comunidad a consultar
     */
    public loadComunity(comunityId: string): Observable<Comunity> {
        return new Observable<Comunity>((observer: Observer<Comunity>) => {
            clientService.post(
                urlProvider.get(urlProvider.URL_LOAD_COMUNITY),
                requestAdapter.getBodyForLoadComunity(comunityId),
                headersService.getHeaders()
            )
                .then(((response: any) => observer.next(responseAdapter.adaptComunity(response))))
                .catch((error: any) => observer.error(error))
                .finally(() => {
                    observer.complete();
                });
        });
    }
}

export const comunityService = new ComunityService();