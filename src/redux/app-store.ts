import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import axios from "axios";

import { IAppState } from './app-state';
import { createLogicMiddleware } from 'redux-logic';
import appLogic from './app-logic';
import { pokemonFightResultReducer } from './reducers/pokemonfightresult.reducer';


const depts = {
    httpClient: axios
}

// @ts-ignore
const logicMiddleware = createLogicMiddleware(appLogic, depts);

const composedMiddleware = compose(applyMiddleware(logicMiddleware));

export const rootReducer = combineReducers<IAppState>({
    pokemonFightResultState: pokemonFightResultReducer
});

const appStore = createStore(
    rootReducer,
    composedMiddleware
);

console.log(appStore.getState());

export default appStore;