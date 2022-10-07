import React from 'react';

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
        <MoviesList />
      </div>
    </>
  );
}

export default App;
