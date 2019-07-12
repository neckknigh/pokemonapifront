import { ConfigProvider as CP } from "../config/config.service";
import queryString from "query-string";

class URLProvider {
    public readonly URL_ACCOUNT_KIT_AUTH_USER: string = "accountkit_auth";
    public readonly URL_USER_GRAPH_ACCOUNT_KIT: string = "accountkit_user";
    public readonly URL_USER_FACEBOOK_SIGN_IN: string = "facebook_signin";
    public readonly URL_PHONE_USER_VALIDATION: string = "phone_user_validation";

    private baseUrl: string;
    private urls: any;

    constructor() {
        this.baseUrl = CP.get(CP.BASE_URL);
        this.urls = {};
        this.urls[this.URL_ACCOUNT_KIT_AUTH_USER] = "https://graph.accountkit.com/v1.3/access_token?grant_type=authorization_code&code=:code&access_token=AA|:facebookappid|:acccountkitappsecret";
        this.urls[this.URL_USER_GRAPH_ACCOUNT_KIT] = "https://graph.accountkit.com/v1.3/me/?access_token=:accessToken";
        this.urls[this.URL_USER_FACEBOOK_SIGN_IN] = this.baseUrl + "facebookSignIn.php";
        this.urls[this.URL_PHONE_USER_VALIDATION] = this.baseUrl + "checkPhoneNumber.php";
    }

    get(key: string, URLPathParams?: any, queryStringParams?: any): string {

        let url: string = "";
        if (this.urls.hasOwnProperty(key)) {
            url = this.replaceParams(this.urls[key], URLPathParams || {});
            url += this.paramsToQueryString(queryStringParams || {});
        }

        return url;
    }

    replaceParams(url: string, params: any): string {
        let returnedUrl = url;
        let paramsKeys = Object.keys(params);

        if (paramsKeys.length) {
            paramsKeys.forEach((key: string) => {
                let regex = new RegExp(":" + key, "g");
                returnedUrl = returnedUrl.replace(regex, params[key]);
            });
        }

        return returnedUrl;
    }

    paramsToQueryString(params: any): string {
        let queryString = "";
        let paramsKeys = Object.keys(params);

        if (paramsKeys.length) {
            queryString = "?";
            paramsKeys.forEach((key: string, index: number) => {
                queryString += (index !== 0) ? "&" : "";
                queryString += key + "=" + params[key];
            });
        }

        return queryString;
    }

    getURLWithoutQueryParams(): string {
        let url = window.location.pathname;
        return url;
    }

    getUrlParamsAsObject(): any {
        return queryString.parse(this.getUrlParams());
    }

    getUrlParams(): string {
        return window.location.search;
    }
}

export const urlProvider = new URLProvider();