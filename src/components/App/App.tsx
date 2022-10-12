import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { URLS } from '../../utils/contants';

import Header from '../Header/Header';
import MoviesList from '../GamesList/GamesList';
import SideBar from '../SideBar/SideBar';

import './App.scss';

function App() {
  return (
    <>
      <SideBar />
      <div className="main">
        <Header />
        <Switch>
          <Route path={URLS.pc}>
            <MoviesList type='FILM' />
          </Route>
          <Route path={URLS.playstation}>
            <MoviesList type='TV_SERIES' />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
