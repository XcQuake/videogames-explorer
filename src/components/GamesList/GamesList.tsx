import React, { useEffect, useState } from 'react';

import './GamesList.scss';
import Preloader from '../Preloader/Preloader';
import { fetchGames } from '../../requests/rawgApi';
import { GameResponse } from '../../types/igdbReponseTypes';
import GameCard from '../GameCard/GameCard';

interface Props {
  type: string;
}

const MoviesList: React.FC<Props> = ({ type }) => {
  const [games, setGames] = useState<GameResponse[]>([]);
  const [pages, setPages] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  function fetchData() {
    // const timer = setTimeout(() => { setIsLoading(true) }, 1500);
    // fetchMovies(type, currentPage)
    //  .then((response) => {
    //     setMovies(response.items);
    //     setPages(response.totalPages);
    //     setIsLoading(false);
    //     // clearTimeout(timer);
    //   })
    fetchGames()
      .then((res) => {
        setGames(res.results);
        console.log(res.results);
      })
  };

  const renderPages = () => {
    const paginationItems = [];
    for (let i=1; i<=pages; i++) {
      paginationItems.push(
        <div
          className='pagination__item'
          key={'page'+i}
          onClick={() => setCurrentPage(i)}
        >{i}</div>
      )
    }
    return paginationItems;
  }

  useEffect(() => {
    fetchData();
  }, [type, currentPage]);

  return (
    <div className='games'>
      {isLoading && <Preloader />}
      { !isLoading && 
        <ul className='games__list'>
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
            />
          ))}
        </ul>
      }
      <div className='pagination'>
        <div className='pagination__button pagination__button_previous' />
        { !isLoading && <div className='pagination__items'>
            { renderPages() }
          </div> 
        }
        <div className='pagination__button pagination__button_next' />
      </div>
    </div>
  )
};

export default MoviesList;