import React, { useEffect, useState } from 'react';

import './MoviesList.scss';
import MoviesListElement from './MoviesListElement';
import { fetchMovies } from '../../requests/kinopoiskApi';
import { Movie } from '../../types/kinopoiskApiTypes';
import Preloader from '../Preloader/Preloader';

interface Props {
  type: string;
}

const MoviesList: React.FC<Props> = ({ type }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchData() {
    const timer = setTimeout(() => { setIsLoading(true) }, 1500);
    fetchMovies(type)
     .then((movies) => {
      setMovies(movies);
      setIsLoading(false);
      clearTimeout(timer);
    })
  };

  useEffect(() => {
    fetchData()
  }, [type]);

  return (
    <div className='movies'>
      {isLoading && <Preloader />}
      { !isLoading && 
        <ul className='movies__list'>
          {movies.map((movie) => (
            <MoviesListElement
              key={movie.kinopoiskId}
              movie={movie}
            />
          ))}
        </ul>
      }
    </div>
  )
};

export default MoviesList;