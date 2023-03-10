import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './GamePage.scss';
import rawgApi from '../../requests/rawgApi';
import { GameDetails, Screenshot } from '../../types/rawgApiTypes';
import GameDescription from './GameDescription';
import GameMedia from './GameMedia';
import { Placeholder } from '../UI';
import { loadImageAsync } from '../../utils';

type Params = {
  id: string | undefined;
};

const GamePage: React.FC = () => {
  const { id } = useParams<Params>();
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [backgroundImage, setBackgroundImage] = useState('');

  gameDetails?.background_image &&
    loadImageAsync(gameDetails?.background_image).then((url) =>
      setBackgroundImage(url)
    );

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
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="gamepage__wrapper">
        {gameDetails ? (
          <GameDescription gameDetails={gameDetails} />
        ) : (
          <Placeholder.GamePage />
        )}
        {screenshots.length > 0 && <GameMedia screenshots={screenshots} />}
      </div>
    </div>
  );
};

export default GamePage;
