import React, { useEffect, useState } from 'react';

import './MoviesList.scss';
import MoviesListElement from './MoviesListElement';
import { fetchMovies } from '../../requests/kinopoiskApi';
import { Movie } from '../../types/kinopoiskApiTypes';

interface Props {
  type: string;
}

const MoviesList: React.FC<Props> = ({ type }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies(type)
      .then((movies) => setMovies(movies))
  }, [type]);

  return (
    <div>
      <ul className='movies-list'>
        {movies.map((movie) => (
          <MoviesListElement
            key={movie.kinopoiskId}
            movie={movie}
          />
        ))}
      </ul>
    </div>
  )
};

export default MoviesList;