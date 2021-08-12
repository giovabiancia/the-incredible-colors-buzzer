import { combineReducers } from "redux";
import punteggioReducer from "./punteggio";

export const allReducer = combineReducers({
  punteggio: punteggioReducer,
});

export  type RootState = ReturnType<typeof allReducer>;

