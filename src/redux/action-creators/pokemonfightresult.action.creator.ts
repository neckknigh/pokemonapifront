
import { POKEMON_FIGHTS_CONSTANTS } from "../../services/constants.service";
import { PokemonResultFightActions } from "../actions/pokemonfightresult.actions";
import { PokemonFightResult } from "../../models/pokemonfightresult.model";

class PokemonFightResultActionCreator {

    public loadLastPokemonFightResult(): PokemonResultFightActions {
        return {
            type: POKEMON_FIGHTS_CONSTANTS.LOAD_LAST_POKEMON_FIGHT_RESULT
        };
    }

    public saveLastPokemonFightResult(lastPokemonFightResult: PokemonFightResult): PokemonResultFightActions {
        return {
            type: POKEMON_FIGHTS_CONSTANTS.SAVE_LAST_POKEMON_FIGHT_RESULT,
            lastPokemonFightResult
        };
    }
}


export const pokemonFightResultActions = new PokemonFightResultActionCreator();