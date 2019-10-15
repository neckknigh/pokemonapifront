import { Action } from "redux";
import { POKEMON_FIGHTS_CONSTANTS } from "../../services/constants.service";
import { PokemonFightResult } from "../../models/pokemonfightresult.model";

export interface ILoadLastPokemonResultFightAction extends Action<POKEMON_FIGHTS_CONSTANTS.LOAD_LAST_POKEMON_FIGHT_RESULT> { }

export interface ISaveLastPokemonFightResultAction extends Action<POKEMON_FIGHTS_CONSTANTS.SAVE_LAST_POKEMON_FIGHT_RESULT> {
    lastPokemonFightResult: PokemonFightResult;
}

export type PokemonResultFightActions = ILoadLastPokemonResultFightAction | ISaveLastPokemonFightResultAction;