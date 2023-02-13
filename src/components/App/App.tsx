import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import GamesList from '../GamesList/GamesList';
import SideBar from '../SideBar/SideBar';

import './App.scss';
import GamePage from '../GamePage/GamePage';

function App() {
  return (
    <>
      <SideBar />
      <div className="main">
        <Header />
        <Switch>
          <Route path="/game-list/:id">
            <GamesList />
          </Route>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
