import React, { useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';

import { GameResponse } from '../../types/rawgApiTypes';
import './GameCard.scss';
import GridElement from '../GridElement/GridElement';
import { Link } from 'react-router-dom';
import Icon from '../UI/Icon/Icon';
import { ICONS } from '../../types';
import { loadImageAsync } from '../../utils';
import Placeholder from '../UI/Placeholder/Placeholder';

interface Props {
  game: GameResponse;
}

const GameCard: React.FC<Props> = ({ game }) => {
  const gameCardRef = useRef(null);
  const rawPosterLink =
    game.background_image &&
    `https://media.rawg.io/media/crop/600/400/${game.background_image.slice(
      27
    )}`;
  const [posterLink, setPosterLink] = useState('');

  loadImageAsync(rawPosterLink).then((url) => setPosterLink(url));

  const renderPlatforms: JSX.Element = (
    <div className="game-card__platforms">
      {game.parent_platforms.map((platform) => {
        return (
          <Icon
            key={platform.platform.id}
            name={platform.platform.slug as ICONS}
            color="secondary"
          />
        );
      })}
    </div>
  );

  const renderDetails: JSX.Element = (
    <div className="game-card__details">
      <ul
        className="game-card__genres"
        style={{ fontSize: game.genres.length >= 4 ? '13px' : '14px' }}
      >
        {game.genres.map((genre) => (
          <li className="game-card__genres-item" key={genre.id}>
            {genre.name}
          </li>
        ))}
      </ul>
      {game.esrb_rating && (
        <div className="game-card__age-rating">
          ESRB: {game.esrb_rating?.name_en}
        </div>
      )}
      {game.metacritic && (
        <div className="game-card__metacritic">
          Metacritic: {game.metacritic} <Icon name="metacritic" color="black" />
        </div>
      )}
    </div>
  );

  return (
    <GridElement gapSpan={2}>
      <Link to={`/game/${game.id}`} className="game-card" ref={gameCardRef}>
        <div className="game-card__poster">
          {posterLink ? (
            <img
              className="game-card__poster-image"
              src={posterLink}
              alt="Game poster"
              loading="lazy"
            />
          ) : (
            <Placeholder.Rect height="100%" />
          )}
        </div>
        <div className="game-card__description">
          <div className="game-card__preview">
            <h4 className="game-card__name">{game.name}</h4>
            <div className="game-card__about">
              {renderPlatforms}
              {game.released && (
                <div className="game-card__release">
                  {format(parseISO(`${game.released}T14:00:00`), 'dd.MM.yyyy')}
                </div>
              )}
            </div>
          </div>
          {renderDetails}
        </div>
      </Link>
    </GridElement>
  );
};

export default GameCard;
