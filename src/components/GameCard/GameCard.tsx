import React from 'react';

import { GameResponse } from '../../types/igdbReponseTypes';
import './GameCard.scss';

interface Props {
  game: GameResponse;
}

const GameCard: React.FC<Props> = ({ game }) => {
  return (
    <div className='game-card'>
      <img
        className='game-card__poster'
        src={game.background_image}
        alt='Game Poster'
      />
      <div className='game-card__description'>
        <p className='game-card__name'>
          {game.name}
        </p>
      </div>
    </div>
  )
};

export default GameCard;
