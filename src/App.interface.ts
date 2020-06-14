import { Planet } from "./Planet.interface";

export interface AppState {
    planets: Planet[]
    publicationDates: string[]
}