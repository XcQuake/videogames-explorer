import React, { useRef, useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";

import placeholder from '../../images/placeholder-image.jpg';
import { GameResponse } from '../../types/rawgApiTypes';
import './GameCard.scss';

interface Props {
  game: GameResponse;
}

const GameCard: React.FC<Props> = ({ game }) => {
  const gameCardRef = useRef<HTMLDivElement>(null);
  const [spansCount, setSpansCount] = useState(27);
  const renderPlatforms: JSX.Element = (
    <div className='game-card__platforms'>
      {game.parent_platforms.map((platform) => {
        return <div className={`platform platform_${platform.platform.slug}`} key={platform.platform.id} />
      })}
    </div>
  )

  const setSpans = () => {
    if (!gameCardRef.current?.clientHeight) return;
    console.log(gameCardRef.current.clientHeight);
    const cardDescHeight = gameCardRef.current.clientHeight;
    const spans = Math.ceil(cardDescHeight / 10) + 20;
    setSpansCount(spans);
  }

  useEffect(() => {
    if (gameCardRef.current) setSpans();
  }, [gameCardRef.current])

  return (
    <li className='game-card' style={{gridRowEnd: `span ${spansCount}`}}>
      <div className='game-card__image'>
        <LazyLoadImage
          className='game-card__poster'
          src={game.short_screenshots[0].image}
          width={200}
          height={180}
          alt='Game Poster'
        />
      </div>
      <div className='game-card__description' ref={gameCardRef}>
        <p className='game-card__name'>
          {game.name}
        </p>
        {renderPlatforms}
      </div>
    </li>
  )
};

export default GameCard;
