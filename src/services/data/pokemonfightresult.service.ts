import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { clientService } from "../config/client.service";
import { urlProvider } from "../config/url.service";
import { PokemonFightResult } from "../../models/pokemonfightresult.model";
import { responseAdapter } from "../adapter/response-adapter.service";

class PokemonFightResultService {

    public getLastPokemonFightResult(): Observable<PokemonFightResult> {
        return new Observable((observer: Observer<PokemonFightResult>) => {

            clientService.get(
                urlProvider.get(urlProvider.URL_LOAD_LAST_POKEMON_FIGHT_RESULT)
            )
                .then(((response: any) => observer.next(responseAdapter.adaptLastPokemonFightResult(response))))
                .catch((error: any) => observer.error(error))
                .finally(() => {
                    observer.complete();
                });
        });
    }
}

export const pokemonFightResultService = new PokemonFightResultService();