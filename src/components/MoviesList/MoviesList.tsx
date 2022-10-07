import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../requests/kinopoiskApi';
import { Movie } from '../../types/kinopoiskApiTypes';

import './MoviesList.scss';
import MoviesListElement from './MoviesListElement';

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    fetchMovies('films')
      .then((films) => setMovies(films))
    console.log(movies);
  }, [])

  return (
    <div>
      <ul className='movies-list'>
        {movies && movies.map((movie) => (
          <MoviesListElement movie={movie} />
        ))}
      </ul>
    </div>
  )
};

export default MoviesList;