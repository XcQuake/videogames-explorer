import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import './GamePage.scss';
import rawgApi from '../../requests/rawgApi';
import { GameDetails } from '../../types/rawgApiTypes';
import { cutTegs, getMetacriticColor } from '../../utils';

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

  const getFormatedText = (text: string) => {
    return text.split('\n').map((str, i) => (
      <p key={`p_${i}`} className="gamepage__description-line">
        {cutTegs(str)}
      </p>
    ));
  };

  const renderReleaseDate: React.ReactNode = gameDetails?.released && (
    <div className="gamepage__details-block">
      <span className="gamepage__details-header">Release</span>
      <p className="gamepage__details-text">
        {format(new Date(gameDetails?.released), 'dd LLLL, yy')}
      </p>
    </div>
  );

  const renderGenres: React.ReactNode = gameDetails?.genres && (
    <div className="gamepage__details-block">
      <span className="gamepage__details-header">Genres</span>
      <p className="gamepage__details-text">
        {gameDetails.genres.map((genre, i) => [
          i > 0 && ', ',
          <span key={`g-${i}`}>{genre.name}</span>,
        ])}
      </p>
    </div>
  );

  const renderMetascore: React.ReactNode = gameDetails?.metacritic && (
    <div className="gamepage__details-block">
      <span className="gamepage__details-header">Metascore</span>
      <p
        className="gamepage__details-text text_center"
        style={{
          color: getMetacriticColor(gameDetails.metacritic),
        }}
      >
        <span className="gamepage__details-metascore">
          {gameDetails.metacritic}
        </span>
      </p>
    </div>
  );

  return (
    <div
      className="gamepage"
      style={{
        backgroundImage: `url(${gameDetails?.background_image})` || '',
      }}
    >
      <div className="gamepage__wrapper">
        <h1 className="gamepage__title">{gameDetails?.name}</h1>
        <div className="gamepage__details">
          {renderReleaseDate}
          {renderGenres}
          {renderMetascore}
        </div>
        <div className="gamepage__description">
          {gameDetails?.description &&
            getFormatedText(gameDetails?.description)}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
