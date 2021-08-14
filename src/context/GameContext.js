import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [game, setGame] = useState([]);
  useEffect(() => {
    // FaKE SERVER
    axios
      .get("https://my-json-server.typicode.com/giovabiancia/demo/posts")
      .then((response) => {
        let classifica = response.data.sort(
          (a, b) => a.punteggio - b.punteggio
        );
        setGame(classifica.reverse());
      });
  }, []);

  useEffect(() => {
    // ordine la classifica
    let classifica = game.sort((a, b) => a.punteggio - b.punteggio);
    setGame(classifica.reverse());
  }, [game]);

  return (
    <GameContext.Provider value={[game, setGame]}>
      {props.children}
    </GameContext.Provider>
  );
};
