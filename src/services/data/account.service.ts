import { Account } from "../../models/account.model";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { clientService } from "../config/client.service";
import { urlProvider } from "../config/url.service";
import { requestAdapter } from "../adapter/request-adapter.service";
import { headersService } from "../authentication/headers.service";
import { responseAdapter } from "../adapter/response-adapter.service";
import { utilService } from "../util.service";

class AccountService {
    private account: Account;

    constructor() {
        //@ts-ignore
        this.account = null;
    }

    // todo: parsear el any a account
    public getAccount(userId: string): Observable<Account> {
        return new Observable((observer: Observer<Account>) => {

            // Si la cuenta ya está en cache, no se consulta.
            if (!utilService.isEmpty(this.account)) {
                observer.next(this.account);
                observer.complete();
                return;
            }

            clientService.post(
                urlProvider.get(urlProvider.URL_USER_BY_ID),
                requestAdapter.getBodyForUserById(userId),
                headersService.getHeaders()
            )
                .then((response: any) => {

                    // TODO: Sacar el 1 como constante
                    if (response.status === 1) {
                        this.account = responseAdapter.adaptUserForAccount(response);
                    }

                    return observer.next(
                        this.account
                    );
                })
                .catch((error: any) => observer.error(error))
                .finally(() => {
                    observer.complete();
                });

        });
    }
}

export const accountService = new AccountService();