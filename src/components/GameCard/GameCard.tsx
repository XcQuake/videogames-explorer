import React from 'react';

import { GameResponse } from '../../types/igdbReponseTypes';
import './GameCard.scss';

interface Props {
  game: GameResponse;
}

const GameCard: React.FC<Props> = ({ game }) => {
  console.log(game);

  const renderPlatforms: JSX.Element = (
    <div className='game-card__platforms'>
      {game.parent_platforms.map((platform) => {
        return <div className={`platform platform_${platform.platform.slug}`} key={platform.platform.id} />
      })}
    </div>
  )

  return (
    <div className='game-card'>
      <div className='game-card__image'>
        <img
          className='game-card__poster'
          src={game.short_screenshots[0].image}
          loading='lazy'
          alt='Game Poster'
        />
      </div>
      <div className='game-card__description'>
        <p className='game-card__name'>
          {game.name}
        </p>
        {renderPlatforms}
      </div>
    </div>
  )
};

export default GameCard;
