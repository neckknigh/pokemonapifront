
import { utilService } from "../util.service";

class URLProvider {
    public readonly URL_LOAD_LAST_POKEMON_FIGHT_RESULT: string = "load_last_pokemon_fight_result";
    private urls: any;

    constructor() {
        this.urls = [];
        this.urls[this.URL_LOAD_LAST_POKEMON_FIGHT_RESULT] = "http://localhost:3000/api/newspaper/pokemonfights/lastresult";
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
}

export const urlProvider = new URLProvider();