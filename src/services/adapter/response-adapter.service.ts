import { PokemonFightResult } from "../../models/pokemonfightresult.model";

class ResponseAdapter {


    public adaptLastPokemonFightResult(rawResult: any) {
        const { Pokefight_result } = rawResult;
        const result: PokemonFightResult = {
            pokemonList: Pokefight_result.map((rawPokemon: any) => {
                return {
                    name: rawPokemon,
                    picture: "/img/pokemons/pokemon.png"
                }
            })
        };

        return result;
    }

}

export const responseAdapter = new ResponseAdapter();