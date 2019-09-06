import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import axios from "axios";

// TODO: Refactorizar: Solo importar un indexs
import { userReducer } from "./reducers/user.reducer";
import { authReducer } from './reducers/auth.reducer';

import { createLogicMiddleware } from 'redux-logic';
import appLogic from './app-logic';
import { systemReducer } from './reducers/system.reducer';
import { comunityReducer } from './reducers/comunity.reducer';
import { promotionReducer } from './reducers/promotion.reducer';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const historyDoo = createBrowserHistory();

const depts = {
    httpClient: axios
}

// @ts-ignore
const logicMiddleware = createLogicMiddleware(appLogic, depts);

const composedMiddleware = compose(applyMiddleware(
    logicMiddleware,
    routerMiddleware(historyDoo)
));

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    userState: userReducer,
    authState: authReducer,
    systemState: systemReducer,
    comunityState: comunityReducer,
    promotionState: promotionReducer
});

/*
export const rootReducer = combineReducers<IAppState>({
    userState: userReducer,
    authState: authReducer,
    systemState: systemReducer,
    comunityState: comunityReducer,
    promotionState: promotionReducer
});
*/

const appStore = createStore(
    createRootReducer(historyDoo),
    composedMiddleware
);

console.log(appStore.getState());

export default appStore;