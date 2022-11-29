import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { URLS } from '../../utils/contants';

import { RAWG_API } from '../../utils/contants';
import Header from '../Header/Header';
import GamesList from '../GamesList/GamesList';
import SideBar from '../SideBar/SideBar';

import './App.scss';
import GamePage from '../GamePage/GamePage';

const { platforms } = RAWG_API;

function App() {
  return (
    <>
      <SideBar />
      <div className="main">
        <Header />
        <Switch>
          <Route path={URLS.pc}>
            <GamesList platformId={platforms.pc} />
          </Route>
          <Route path={URLS.playstation}>
            <GamesList platformId={platforms.playstation} />
          </Route>
          <Route path={URLS.xbox}>
            <GamesList platformId={platforms.xbox} />
          </Route>
          <Route path="/:id">
            <GamePage />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
