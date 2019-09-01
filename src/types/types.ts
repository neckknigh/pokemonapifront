import { IAppState } from "../redux/app-state";
import { Action } from "redux";
import * as H from 'history';

export type NullableString = string | null;
export type ActionValidation = { getState: () => IAppState, action: Action };
export interface IRouterProps {
    history?: H.History;
    location?: H.Location;
    match?: any;
}; 