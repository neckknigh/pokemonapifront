import { PokemonFightResult } from "../../models/pokemonfightresult.model";

export interface IPokemonFightResultState {
    readonly lasPokemonFightResult: PokemonFightResult | null;
} 