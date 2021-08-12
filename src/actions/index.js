import axios from "axios";

export const increment = (num) => {
  return {
    type: "INCREMENT",
    payload: num,
  };
};
export const saveGame = (obj) => {
  return {
    type: "SAVE_GAME",
    payload: obj,
  };
};
