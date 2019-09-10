import { Comunity } from "../../models/comunity.model";

export interface IComunityState {
    recomendedComunities: Comunity[];
    comunityLoaded: Comunity | null;
    popularComunities: Comunity[];
}