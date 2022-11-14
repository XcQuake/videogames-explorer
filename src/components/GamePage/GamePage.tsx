import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import './GamePage.scss';
import rawgApi from '../../requests/rawgApi';
import { GameDetails } from '../../types/rawgApiTypes';

interface Props {
  test: string;
}

type Params = {
  id: string | undefined;
};

const GamePage: React.FC<Props> = ({ test }) => {
  const { id } = useParams<Params>();

  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);

  useEffect(() => {
    if (!id) return;
    rawgApi.getGameDetails(id).then((gameData) => setGameDetails(gameData));
  }, [id]);
  console.log(gameDetails?.background_image);
  return (
    <div
      className="gamepage"
      style={{
        backgroundImage: `url(${gameDetails?.background_image}) ` || '',
      }}
    >
      <div className="gamepage__wrapper">
        <h1 className="gamepage__title">{gameDetails?.name}</h1>
      </div>
    </div>
  );
};

export default GamePage;
