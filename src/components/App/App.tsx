import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { URLS } from '../../utils/contants';

import Header from '../Header/Header';
import MoviesList from '../MoviesList/MoviesList';
import SideBar from '../SideBar/SideBar';

import './App.scss';

function App() {
  return (
    <>
      <SideBar />
      <div className="main">
        <Header />
        <Switch>
          <Route path={URLS.films}>
            <MoviesList type='FILM' />
          </Route>
          <Route path={URLS.tvSeries}>
            <MoviesList type='TV_SERIES' />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
