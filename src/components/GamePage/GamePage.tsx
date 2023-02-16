import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import './GamePage.scss';
import rawgApi from '../../requests/rawgApi';
import { GameDetails, Screenshot } from '../../types/rawgApiTypes';
import GameDescription from './GameDescription';
import GameMedia from './GameMedia';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

type Params = {
  id: string | undefined;
};

const GamePage: React.FC = () => {
  const { id } = useParams<Params>();
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const history = useHistory();

  useEffect(() => {
    if (!id) return;
    rawgApi.getGameDetails(id).then((gameData) => setGameDetails(gameData));
    rawgApi
      .getGameScreenshots(id)
      .then((screenData) => setScreenshots(screenData.results));
  }, [id]);

  return (
    <div
      className="gamepage"
      style={{
        backgroundImage: `url(${gameDetails?.background_image})` || '',
      }}
    >
      <div className="gamepage__wrapper">
        {gameDetails && <GameDescription gameDetails={gameDetails} />}
        {screenshots.length > 0 && <GameMedia screenshots={screenshots} />}
        <Button
          onClick={() => history.goBack()}
          color="inherit"
          size="large"
          className="gamepage__back-button"
        >
          <Icon color="white" name="arrow_left" size="large" />
        </Button>
      </div>
    </div>
  );
};

export default GamePage;
