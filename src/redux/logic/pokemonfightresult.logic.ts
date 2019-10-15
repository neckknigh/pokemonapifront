import { createLogic } from "redux-logic";
import { POKEMON_FIGHTS_CONSTANTS } from "../../services/constants.service";
import { pokemonFightResultService } from "../../services/data/pokemonfightresult.service";
import { PokemonFightResult } from "../../models/pokemonfightresult.model";
import { pokemonFightResultActions } from "../action-creators/pokemonfightresult.action.creator";

const getLastPokemonFightResult = createLogic({
    type: POKEMON_FIGHTS_CONSTANTS.LOAD_LAST_POKEMON_FIGHT_RESULT,
    latest: true,
    // eslint-disable-next-line
    process({ action }, dispatch, done) {
        console.log("action in pokemon", action);

        pokemonFightResultService.getLastPokemonFightResult()
            .subscribe(
                (lastPokemonFightResult: PokemonFightResult) => {
                    console.log(lastPokemonFightResult);
                    dispatch(pokemonFightResultActions.saveLastPokemonFightResult(lastPokemonFightResult));
                }, error => {
                    console.log(error);
                    done();
                },
                () => {
                    done();
                }
            );
    }
});

const pokemonFightResultLogics = [
    getLastPokemonFightResult
];


export default pokemonFightResultLogics;