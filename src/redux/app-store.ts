import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import axios from "axios";

// TODO: Refactorizar: Solo importar un indexs
import { userReducer } from "./reducers/user.reducer";
import { authReducer } from './reducers/auth.reducer';

import { IAppState } from './app-state';
import { createLogicMiddleware } from 'redux-logic';
import appLogic from './app-logic';
import { systemReducer } from './reducers/system.reducer';
import { comunityReducer } from './reducers/comunity.reducer';


const depts = {
    httpClient: axios
}

// @ts-ignore
const logicMiddleware = createLogicMiddleware(appLogic, depts);

const composedMiddleware = compose(applyMiddleware(logicMiddleware));

export const rootReducer = combineReducers<IAppState>({
    userState: userReducer,
    authState: authReducer,
    systemState: systemReducer,
    comunityState: comunityReducer

});

const appStore = createStore(
    rootReducer,
    composedMiddleware
);

console.log(appStore.getState());

export default appStore;