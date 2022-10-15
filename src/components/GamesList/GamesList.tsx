import React, { useEffect, useState } from 'react';

import './GamesList.scss';
import { GameResponse } from '../../types/rawgApiTypes';
import { fetchGames } from '../../requests/rawgApi';
import Preloader from '../Preloader/Preloader';
import GameCard from '../GameCard/GameCard';

interface Props {
  type: string;
}

const MoviesList: React.FC<Props> = ({ type }) => {
  const [games, setGames] = useState<GameResponse[]>([]);
  const [nextPage, setNextPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  function fetchData(page: number){
    setTimeout(() => {
      fetchGames(page)
        .then((res) => {
          res.next && setNextPage(nextPage + 1);
          setGames(games.concat(res.results));
          setIsFetching(false);
        });
    }, 500)
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchData(nextPage);
  }, [isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true);
  };

  useEffect(() => {
    fetchData(1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='games'>
      <ul className='games__list'>
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
          />
        ))}
      </ul>
      { isFetching && <li className='games__preloader'><Preloader /></li> }
    </div>
  )
};

export default MoviesList;