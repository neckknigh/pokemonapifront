import { Reducer } from 'redux';
import { IAppState } from '../app-state';
//import { actionTypes } from '../action-types';
import { DefaultAction } from '../actions/actions';

const initialState: IAppState = {
    isLoggedIn: true
};

// root reducer
export const rootReducer: Reducer<IAppState, DefaultAction> = (
    state: IAppState = initialState,
    action: DefaultAction
): IAppState => {
    return state;
};