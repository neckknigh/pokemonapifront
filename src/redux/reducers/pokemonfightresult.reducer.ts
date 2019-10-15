
import { Reducer } from "redux";
import { POKEMON_FIGHTS_CONSTANTS } from "../../services/constants.service";
import { IPokemonFightResultState } from "../states/pokemonfightresult.state";
import { PokemonResultFightActions } from "../actions/pokemonfightresult.actions";

// Estado inicial del usuario
const initialPokemonFightResultState: IPokemonFightResultState = {
    lasPokemonFightResult: null
};

// root reducer
export const pokemonFightResultReducer: Reducer<IPokemonFightResultState, PokemonResultFightActions> = (
    state: IPokemonFightResultState = initialPokemonFightResultState,
    action: PokemonResultFightActions
): IPokemonFightResultState => {

    // Se examina la acción
    switch (action.type) {

        case POKEMON_FIGHTS_CONSTANTS.SAVE_LAST_POKEMON_FIGHT_RESULT:
            return {
                ...state,
                lasPokemonFightResult: action.lastPokemonFightResult
            };

        default:
            return state;
    }
};
