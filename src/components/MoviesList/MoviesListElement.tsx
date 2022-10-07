import React from 'react';
import { Movie } from '../../types/kinopoiskApiTypes';

import './MoviesListElement.scss';

interface Props {
  movie: Movie;
}

const MoviesListElement: React.FC<Props> = ({ movie }) => {
  return (
    <div className='movie'>
      <img
        className='movie__poster'
        src={movie.posterUrlPreview}
        alt='movie'
      />
      <div className='movie__description'>
        <p className='movie__name'>{movie.nameRu}</p>
      </div>
    </div>
  )
};

export default MoviesListElement;
