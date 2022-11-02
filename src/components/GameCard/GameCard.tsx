import React, { useRef, useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

import { GameResponse } from '../../types/rawgApiTypes';
import './GameCard.scss';
import SpanableElement from '../GridElement/GridElement';

interface Props {
  game: GameResponse;
}

const GameCard: React.FC<Props> = ({ game }) => {
  const gameDescRef = useRef<HTMLDivElement>(null);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [isShown, setIsShown] = useState(false);

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

  useEffect(() => {
    if (isMouseEnter) {
      const timer = setTimeout(() => setIsShown(true), 150);
      return () => clearTimeout(timer);
    } else {
      setIsShown(false);
    }
  }, [isMouseEnter]);

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
    <SpanableElement gapSpan={2}>
      <div
        className="game-card"
        onMouseEnter={() => setIsMouseEnter(true)}
        onMouseLeave={() => setIsMouseEnter(false)}
      >
        <div className="game-card__poster">
          <img
            className="game-card__poster-image"
            src={posterLink}
            alt="Game poster"
            loading="lazy"
          />
        </div>
        <div className="game-card__description" ref={gameDescRef}>
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
          {isShown && renderDetails}
        </div>
      </div>
    </SpanableElement>
  );
};

export default GameCard;
