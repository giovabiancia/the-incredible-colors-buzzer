import axios from "axios";

export const increment = (num) => {
  return {
    type: "INCREMENT",
    payload: num,
  };
};
