import React from 'react';
import { format } from 'date-fns';

import { GameDetails } from '../../types/rawgApiTypes';
import { cutTegs, getMetacriticColor } from '../../utils';
import { ICONS } from '../../types';
import { Icon } from '../UI';

interface Props {
  gameDetails: GameDetails;
}

const GameDescription: React.FC<Props> = ({ gameDetails }) => {
  const getFormatedText = (text: string) => {
    const textArr: JSX.Element[] = [];
    text.split('\n').map((str, i) =>
      textArr.push(
        <p key={`p_${i}`} className="gamepage__about-line">
          {cutTegs(str.slice(0, 1000))}
        </p>
      )
    );
    return textArr;
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
      'Release date',
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
      <p className="gamepage__details-text flex-row">
        <Icon name="metacritic" color="white" size="small" />
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
          <Icon
            key={`pl-${i}`}
            size="medium"
            name={el.platform.slug as ICONS}
            color="white"
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
    <div className="gamepage__description">
      <h1 className="gamepage__title">{gameDetails?.name}</h1>
      <div className="gamepage__details">
        {renderReleaseDate}
        {renderGenres}
        {renderMetascore}
        {renderPlatforms}
        {renderDevelopers}
      </div>
      <div className="gamepage__about">
        {gameDetails?.description &&
          getFormatedText(gameDetails?.description)[0]}
      </div>
    </div>
  );
};

export default GameDescription;
