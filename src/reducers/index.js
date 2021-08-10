import { combineReducers } from "redux";
import punteggioReducer from "./punteggio";

const allReducer = combineReducers({
  punteggio: punteggioReducer,
});

export default allReducer;
