import { ConfigProvider as CP } from "../config/config.service";
import queryString from "query-string";
import { utilService } from "../util.service";

class URLProvider {
    public readonly URL_ACCOUNT_KIT_AUTH_USER: string = "accountkit_auth";
    public readonly URL_USER_GRAPH_ACCOUNT_KIT: string = "accountkit_user";
    public readonly URL_USER_FACEBOOK_SIGN_IN: string = "facebook_signin";
    public readonly URL_PHONE_USER_VALIDATION: string = "phone_user_validation";
    public readonly URL_USER_REGISTRATION: string = "user_registration";
    public readonly URL_RECOMENDED_COMUNITIES: string = "recomended_comunities";
    public readonly URL_PROMOTIONS: string = "promotions";
    public readonly URL_USER_BY_ID: string = "user_by_id";
    public readonly URL_COMUNITY_DETAIL: string = "comunity_detail";
    public readonly URL_LOAD_COMUNITY: string = "load_comunity";

    private baseUrl: string;
    private urls: any;

    constructor() {
        this.baseUrl = CP.get(CP.BASE_URL);
        this.urls = {};
        this.urls[this.URL_ACCOUNT_KIT_AUTH_USER] = "https://graph.accountkit.com/v1.3/access_token?grant_type=authorization_code&code=:code&access_token=AA|:facebookappid|:acccountkitappsecret";
        this.urls[this.URL_USER_GRAPH_ACCOUNT_KIT] = "https://graph.accountkit.com/v1.3/me/?access_token=:accessToken";
        this.urls[this.URL_USER_FACEBOOK_SIGN_IN] = this.baseUrl + "facebookSignIn.php";
        this.urls[this.URL_PHONE_USER_VALIDATION] = this.baseUrl + "checkPhoneNumber.php";
        this.urls[this.URL_USER_REGISTRATION] = this.baseUrl + "phoneSignIn.php";
        this.urls[this.URL_RECOMENDED_COMUNITIES] = this.baseUrl + "getComReco.php";
        this.urls[this.URL_USER_BY_ID] = this.baseUrl + "getDooUserById.php";
        this.urls[this.URL_PROMOTIONS] = this.baseUrl + "prcGetAnunciosNew.php";
        this.urls[this.URL_LOAD_COMUNITY] = this.baseUrl + "prcGetAnunciosNew.php";
        this.urls[this.URL_LOAD_COMUNITY] = this.baseUrl + "getComById.php";


        // internal urls
        this.urls[this.URL_COMUNITY_DETAIL] = "/comunities/:id";
    }

    get(key: string, URLPathParams?: any, queryStringParams?: any): string {
        let url: string = "";
        if (this.urls.hasOwnProperty(key)) {
            url = this.replaceParams(this.urls[key], URLPathParams || {});
            url += this.paramsToQueryString(queryStringParams || {});
        }

        return url;
    }

    replaceParams(url: string, params: string[]): string {
        return utilService.replaceParamsInString(url, params);
    }

    paramsToQueryString(params: any): string {
        let queryString = "";
        const paramsKeys = Object.keys(params);

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
        const url = window.location.pathname;
        return url;
    }

    getUrlParamsAsObject(): any {
        return queryString.parse(this.getUrlParams());
    }

    getUrlParams(): string {
        return window.location.search;
    }

    isRoot(): boolean {
        return window.location.pathname === this.getRootPath();
    }

    getRootPath(): string {
        return "/";
    }

    public getPathArray(): string[] {
        return this.getURLWithoutQueryParams().split(this.getRootPath());
    }
}

export const urlProvider = new URLProvider();