import { SystemConstants, AuthConstants } from "./constants.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import axios from "axios";
import queryString from "query-string";
import { Account } from "../models/account.model";
import { authAdapter } from "./adapter/auth.adapter.service";


class AuthService {

    private rootWindow: any = window;

    /**
    * Permite cargar el api (sdk) de Facebook Account Kit
    * on demand.
    *              
    */
    public loadAccountKitSDK(): Promise<Boolean> {
        const loadPromise = new Promise<Boolean>((resolve, reject) => {
            //debugger;

            // Si ya existe el script, no se carga nuevamente.
            if (typeof this.rootWindow["AccountKit_OnInteractive"] === "function") {
                resolve(true);
            }
            else {
                const script = document.createElement('script');
                script.type = "text/javascript";
                script.async = true;
                script.defer = true;
                script.src = "https://sdk.accountkit.com/es_LA/sdk.js";
                script.id = SystemConstants.ACCOUNT_KIT_API_ID;
                script.onload = () => {
                    this.initializeAccountKit();
                    resolve(true);
                };
                script.onerror = () => reject(false);
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        });

        return loadPromise;
    }


    private initializeAccountKit(): void {
        const me = this;

        // initialize Account Kit with CSRF protection
        this.rootWindow["AccountKit_OnInteractive"] = function () {
            me.rootWindow["AccountKit"].init({
                appId: "368256876708367",
                state: "31e2a963ada08b93e2667243805407c3",
                version: "v1.1",
                fbAppEventsEnabled: true,
                redirect: "http://localhost:3000/",
                debug: true
            });
        }
    }

    public getAccountKitAuth(): Observable<any> {
        return new Observable((observer: Observer<any>) => {

            // Si la url no tiene el formato correcto
            if (!this.getUrlParams().includes(AuthConstants.ACCOUT_KIT_PARTIALLY_AUTH_STATUS)) {
                observer.error({
                    msg: "Ocurrió un error!"
                });
                observer.complete();
            }
            else {
                // TODO: Sacar estas constantes de aqui
                const objectUrlParams = this.getUrlParamsAsObject();
                axios.get(`https://graph.accountkit.com/v1.3/access_token?grant_type=authorization_code&code=${objectUrlParams.code}&access_token=AA|368256876708367|451561d911947080fb697fcc53eef74f`)
                    .then((response) => observer.next(response.data))
                    .catch((error) => observer.error(error))
                    .finally(() => observer.complete());
            }
        });
    }

    public getAccountKitUser(): Observable<Account> {
        return new Observable((observer: Observer<Account>) => {
            this.getAccountKitAuth()
                .subscribe(
                    (response: any) => {
                        // TODO: Crear método que reciba un string y reemplace los params
                        axios.get(`${AuthConstants.ACCOUNT_KIT_USER_API}${response.access_token}`)
                            .then((response) => observer.next(
                                authAdapter.adaptAccountKitUserForAccount(response.data)
                            )
                            )
                            .catch((error) => observer.error(error))
                            .finally(() => observer.complete());
                    }, error => {
                        observer.error(error);
                        observer.complete();
                    },
                    () => {
                        console.log("Get account kit user data completed");
                    }
                );
        });
    }

    private getUrlParamsAsObject(): any {
        return queryString.parse(this.getUrlParams());
    }

    private getUrlParams(): string {
        return window.location.search;
    }
}

export const authService = new AuthService();