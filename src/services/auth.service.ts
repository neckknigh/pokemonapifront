import { SystemConstants } from "./constants.service";

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
}

export const authService = new AuthService();