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
  const posterLink = `https://media.rawg.io/media/crop/600/400/${game.background_image.slice(27)}`

  const setSpans = () => {
    if (!gameDescRef.current?.clientHeight) return;
    const cardDescHeight = gameDescRef.current.clientHeight;
    const spans = Math.ceil(cardDescHeight / 10) + 25;
    setSpansCount(spans);
  };

  useEffect(() => {
    if (gameDescRef.current) setSpans();
  }, [gameDescRef.current]);

  const renderPlatforms: JSX.Element = (
    <div className='game-card__platforms'>
      {game.parent_platforms.slice(0, 4).map((platform) => {
        return <div className={`platform platform_${platform.platform.slug}`} key={platform.platform.id} />
      })}
      {game.parent_platforms.length > 4 && <div className='platform platform_more' />}
    </div>
  );

  return (
    <li
      className='games__list-element'
      style={{gridRowEnd: `span ${spansCount}`}}
      ref={gameCardRef}
    >
      <div className='game-card'>
        <div className='game-card__poster'>
          <img
            className='game-card__poster-image'
            src={posterLink}
            alt='Poster'
            loading='lazy'
          />
        </div>
        <div className='game-card__description' ref={gameDescRef}>
          <p className='game-card__name'>
            {game.name}
          </p>
          <div className='game-card__field'>
            {renderPlatforms}
            <div className='game-card__release'>
              {format(parseISO(`${game.released}T14:00:00`), 'dd.MM.yyyy')}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
};

export default GameCard;
