import { IAppState } from "../redux/app-state";
import { Action } from "redux";

export type NullableString = string | null;
export type ActionValidation = { getState: () => IAppState, action: Action };