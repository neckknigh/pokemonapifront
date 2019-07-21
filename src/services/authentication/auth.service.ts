import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Account } from "../../models/account.model";
import { responseAdapter } from "../adapter/response-adapter.service";
import { urlProvider } from "../config/url.service";
import { ConfigProvider as CP } from "../config/config.service";
import { requestAdapter } from "../adapter/request-adapter.service";
import { clientService } from "../config/client.service";


class AuthService {

    public static readonly USER_ID_FIELD_NAME = "user_id";
    public static readonly ACCESS_TOKEN_NAME = "access_token";
    private rootWindow: any = window;
    private accountKitData: any = null;

    /**
    * Permite cargar el api (sdk) de Facebook Account Kit
    * on demand.
    *              
    */
    public loadAccountKitSDK(): Promise<Boolean> {
        const loadPromise = new Promise<Boolean>((resolve, reject) => {
            //debugger;

            // Si ya existe el script, no se carga nuevamente.
            if (typeof this.rootWindow[CP.get(CP.ACCOUNT_KIT_WINDOW_PROPERTY)] === "function") {
                resolve(true);
            }
            else {
                const script = document.createElement('script');
                script.type = "text/javascript";
                script.async = true;
                script.defer = true;
                script.src = CP.get(CP.ACCOUNT_KIT_SDK_SRC);
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
        this.rootWindow[CP.get(CP.ACCOUNT_KIT_WINDOW_PROPERTY)] = function () {
            me.rootWindow[CP.get(CP.ACCOUNT_KIT)].init({
                appId: CP.get(CP.FACEBOOK_APP_ID),
                state: CP.get(CP.ACCOUNT_KIT_STATE),
                version: CP.get(CP.ACCOUNT_KIT_VERSION),
                fbAppEventsEnabled: CP.get(CP.ACCOUNT_KIT_ENABLE_FACEBOOK_EVENTS),
                debug: CP.get(CP.ACCOUNT_KIT_DEBUG_MODE)
            });
        }
    }

    /**
     * Permite obtener información sensible para realizar
     * el proceso de login con account kit.
     * 
     */
    public getAccountKitAuth(): Observable<any> {
        return new Observable((observer: Observer<any>) => {

            // Si la url no tiene el formato correcto
            if (!urlProvider.getUrlParams().includes(CP.get(CP.ACCOUT_KIT_PARTIALLY_AUTH_STATUS))) {

                // TODO: Mandar un mensaje más significativo.
                observer.error({
                    msg: "Ocurrió un error!"
                });
                observer.complete();
            }
            else {
                clientService.get(
                    urlProvider.get(
                        urlProvider.URL_ACCOUNT_KIT_AUTH_USER,
                        {
                            code: urlProvider.getUrlParamsAsObject().code,
                            facebookappid: CP.get(CP.FACEBOOK_APP_ID),
                            acccountkitappsecret: CP.get(CP.ACCOUNT_KIT_APP_SECRET)
                        }
                    )
                )
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
                        clientService.get(
                            urlProvider.get(
                                urlProvider.URL_USER_GRAPH_ACCOUNT_KIT,
                                {
                                    accessToken: response.access_token
                                }
                            )
                        )
                            .then((response) => {
                                this.accountKitData = responseAdapter.adaptAccountKitUserForAccount(response.data);
                                return observer.next(
                                    this.accountKitData
                                );
                            }
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

    /**
     * Permite guardar los datos obtenidos de la api de facebook
     * al servicio web de doo
     * @param facebookUserData datos del usuario de facebook 
     */
    public saveFacebookUser(facebookUserData: any): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            console.log("Guardando..", facebookUserData);


            clientService.post(
                urlProvider.get(urlProvider.URL_USER_FACEBOOK_SIGN_IN),
                requestAdapter.getBodyDataForSaveFacebookUser(facebookUserData)
            )
                .then(((response: any) => observer.next(response)))
                .catch((error: any) => observer.error(error))
                .finally(() => {
                    observer.complete();
                });

        });
    }

    public validatePhoneUser(userData: Account): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            console.log("Phone number validation..", userData);

            clientService.post(
                urlProvider.get(urlProvider.URL_PHONE_USER_VALIDATION),
                requestAdapter.getBodyDataForPhoneUserValidation(userData)
            )
                .then(((response: any) => observer.next(
                    responseAdapter.adaptPhoneUserValidationResponse(
                        response
                    )
                )))
                .catch((error: any) => observer.error(error))
                .finally(() => {
                    observer.complete();
                });

        });
    }

    public signUpUser(userData: any): Observable<any> {
        return new Observable((observer: Observer<any>) => {

            clientService.post(
                urlProvider.get(urlProvider.URL_USER_REGISTRATION),
                requestAdapter.getBodyDataForUserRegistration(userData, this.accountKitData)
            )
                .then((response: any) => {
                    return observer.next(response);
                })
                .catch((error: any) => observer.error(error))
                .finally(() => {
                    observer.complete();
                });

        });
    }

    public createSession(data: any): void {
        this.setToken(data.userId);
        this.setUserId(data.userToken);
    }

    private setToken(token: string): void {
        localStorage.setItem(AuthService.ACCESS_TOKEN_NAME, token);
    }

    private getToken(): string {
        return localStorage.getItem(AuthService.ACCESS_TOKEN_NAME)!;
    }

    private setUserId(id: string): void {
        localStorage.setItem(AuthService.USER_ID_FIELD_NAME, id);
    }

    private getUserId() {
        return localStorage.getItem(AuthService.USER_ID_FIELD_NAME);
    }
}

export const authService = new AuthService();