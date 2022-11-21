import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import './GamePage.scss';
import rawgApi from '../../requests/rawgApi';
import { GameDetails } from '../../types/rawgApiTypes';
import { cutTegs, getMetacriticColor } from '../../utils';
import Icon from '../Icon/Icon';
import { ICONS } from '../../types';

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

  const renderGameDetailsBlock = (
    header: string,
    children: React.ReactNode
  ): React.ReactNode => {
    return (
      <div className="gamepage__details-block">
        <span className="gamepage__details-header">{header}</span>
        {children}
      </div>
    );
  };

  const renderReleaseDate: React.ReactNode =
    gameDetails?.released &&
    renderGameDetailsBlock(
      'Release',
      <p className="gamepage__details-text">
        {format(new Date(gameDetails?.released), 'd LLLL, yyyy')}
      </p>
    );

  const renderGenres: React.ReactNode =
    gameDetails?.genres &&
    renderGameDetailsBlock(
      'Genres',
      <p className="gamepage__details-text">
        {gameDetails.genres.map((genre, i) => [
          <span key={`g-${i}`}>{genre.name}</span>,
        ])}
      </p>
    );

  const renderMetascore: React.ReactNode =
    gameDetails?.metacritic &&
    renderGameDetailsBlock(
      'Metascore',
      <p className="gamepage__details-text text_center">
        <a
          className="gamepage__details-metascore"
          href={gameDetails.metacritic_url}
          style={{
            color: getMetacriticColor(gameDetails.metacritic),
          }}
        >
          {gameDetails.metacritic}
        </a>
      </p>
    );

  const renderPlatforms: React.ReactNode =
    gameDetails?.platforms &&
    renderGameDetailsBlock(
      'Platforms',
      <p className="gamepage__details-text flex-row">
        {gameDetails.parent_platforms.map((el, i) => [
          ' ',
          <Icon
            key={`pl-${i}`}
            size="medium"
            name={el.platform.slug as ICONS}
            color="secondary"
          />,
        ])}
      </p>
    );

  const renderDevelopers: React.ReactNode =
    gameDetails?.developers &&
    renderGameDetailsBlock(
      'Developers',
      <p className="gamepage__details-text">
        {gameDetails.developers.map((el, i) => [
          <span key={`dev-${i}`}>{el.name}</span>,
        ])}
      </p>
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
          {renderPlatforms}
          {renderDevelopers}
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
