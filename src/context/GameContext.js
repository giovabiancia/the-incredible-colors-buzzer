import React, { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [game, setGame] = useState([]);
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
