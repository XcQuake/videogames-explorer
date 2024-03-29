import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../Header/Header';
import GamesList from '../GamesList/GamesList';
import SideBar from '../SideBar/SideBar';

import './App.scss';
import GamePage from '../GamePage/GamePage';
import MobileBar from '../MobileBar/MobileBar';

function App() {
  return (
    <>
      <SideBar />
      <div className="main">
        <Header />
        <Switch>
          <Redirect exact from="/" to="/games/pc" />
          <Route path="/games/:id">
            <GamesList />
          </Route>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </Switch>
        <MobileBar />
      </div>
    </>
  );
}

export default App;
