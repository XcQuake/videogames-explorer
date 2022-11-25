import React, { useRef } from 'react';
import { format, parseISO } from 'date-fns';

import { GameResponse } from '../../types/rawgApiTypes';
import './GameCard.scss';
import GridElement from '../GridElement/GridElement';
import { Link } from 'react-router-dom';

interface Props {
  game: GameResponse;
}

const GameCard: React.FC<Props> = ({ game }) => {
  const gameCardRef = useRef(null);

  const posterLink =
    game.background_image &&
    `https://media.rawg.io/media/crop/600/400/${game.background_image.slice(
      27
    )}`;

  const renderPlatforms: JSX.Element = (
    <div className="game-card__platforms">
      {game.parent_platforms.map((platform) => {
        return (
          <span
            className={`platform platform_${platform.platform.slug}`}
            key={platform.platform.id}
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
          Metacritic: {game.metacritic}{' '}
          <span className="game-card__metacritic-icon" />
        </div>
      )}
    </div>
  );

  return (
    <GridElement gapSpan={2}>
      <Link to={`/${game.id}`} className="game-card" ref={gameCardRef}>
        <div className="game-card__poster">
          <img
            className="game-card__poster-image"
            src={posterLink}
            alt="Game poster"
            loading="lazy"
          />
        </div>
        <div className="game-card__description">
          <div className="game-card__preview">
            <p className="game-card__name">{game.name}</p>
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
