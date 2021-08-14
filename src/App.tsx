import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './pages/Landing';
import LeaderBoard from './pages/LeaderBoard';
import Game from './pages/Game';
import { GameProvider } from './context/GameContext';



const App : React.FC =()=> {


  return (
    <GameProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component = {Landing}></Route>
          <Route path="/leader-board" exact component = {LeaderBoard}></Route>
          <Route path="/game" exact component = {Game}></Route>
        </Switch>
      </BrowserRouter>
    </GameProvider>

  );
}

export default App;
