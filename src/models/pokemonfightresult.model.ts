import { Pokemon } from "./pokemon.model";

export class PokemonFightResult {
    id?: string;
    pokemonList: Pokemon[];

    constructor(
        id: string,
        pokemonList: Pokemon[]
    ) {
        this.id = id;
        this.pokemonList = pokemonList;
    }
}