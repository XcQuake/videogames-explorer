import React, { useRef, useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

import { GameResponse } from '../../types/rawgApiTypes';
import './GameCard.scss';

interface Props {
  game: GameResponse;
}

const GameCard: React.FC<Props> = ({ game }) => {
  const gameCardRef = useRef<HTMLLIElement>(null);
  const gameDescRef = useRef<HTMLDivElement>(null);
  const [spansCount, setSpansCount] = useState(27);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const posterLink = `https://media.rawg.io/media/crop/600/400/${game.background_image.slice(27)}`

  const setSpans = () => {
    if (!gameDescRef.current?.clientHeight) return;
    const cardDescHeight = gameDescRef.current.clientHeight;
    setSpansCount(Math.ceil(cardDescHeight / 10) + 25);
  };

  useEffect(() => {
    if (gameDescRef.current) setSpans();
  }, [gameDescRef.current]);

  const renderPlatforms: JSX.Element = (
    <div className='game-card__platforms'>
      {game.parent_platforms.map((platform) => {
        return <div className={`platform platform_${platform.platform.slug}`} key={platform.platform.id} />
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
    <div className={`game-card__details`}>
      <ul className={`game-card__genres`}>
        {game.genres.map((genre) => <li className='game-card__genres-item'>{genre.name}</li>)}
      </ul>
    </div>
  )

  return (
    <li
      className='games__list-element'
      style={{gridRowEnd: `span ${spansCount}`}}
      ref={gameCardRef}
    >
      <div
        className='game-card'
        onMouseEnter={() => setIsMouseEnter(true)}
        onMouseLeave={() => setIsMouseEnter(false)}
      >
        <div className='game-card__poster'>
          <img
            className='game-card__poster-image'
            src={posterLink}
            alt='Game poster'
            loading='lazy'
          />
        </div>
        <div className='game-card__description' ref={gameDescRef}>
          <p className='game-card__name'>
            {game.name}
          </p>
          <div className='game-card__about'>
            {renderPlatforms}
            <div className='game-card__release'>
              {format(parseISO(`${game.released}T14:00:00`), 'dd.MM.yyyy')}
            </div>
          </div>
          { isShown && renderDetails }
        </div>
      </div>
    </li>
  )
};

export default GameCard;
