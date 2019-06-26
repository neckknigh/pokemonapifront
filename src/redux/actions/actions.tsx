import { Action } from 'redux';
import { ActionTypes } from '../action-types';
//import { appStore } from '../app-store';

export interface DefaultAction extends Action {
    prop: any
}

export const createDefaultAction: () => DefaultAction = () => ({
    type: ActionTypes.DEFAULT_ACTION_1,
    prop: ""
});