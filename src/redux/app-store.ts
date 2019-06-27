import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";

import { userReducer } from "./reducers/user.reducer";

export const rootReducer = combineReducers({
    userState: userReducer
});

const appStore = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

console.log(appStore.getState());

export default appStore;