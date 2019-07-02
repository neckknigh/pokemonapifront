import { createStore, combineReducers } from 'redux';


import { userReducer } from "./reducers/user.reducer";
import { IAppState } from './app-state';

export const rootReducer = combineReducers<IAppState>({
    userState: userReducer
});

const appStore = createStore<IAppState, any, any, any>(
    rootReducer //,
    //applyMiddleware(thunk)
);

console.log(appStore.getState());

export default appStore;