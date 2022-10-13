import React, { useEffect, useState } from 'react';

import './GamesList.scss';
import Preloader from '../Preloader/Preloader';
import { fetchGames } from '../../requests/rawgApi';
import { GameResponse } from '../../types/igdbReponseTypes';
import GameCard from '../GameCard/GameCard';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

interface Props {
  type: string;
}

const MoviesList: React.FC<Props> = ({ type }) => {
  const [games, setGames] = useState<GameResponse[]>([]);
  const [nextPage, setNextPage] = useState<string>('https://api.rawg.io/api/games?key=66079383234d4dcb920bcfc26e2fb8ae&page=2&platforms=4');
  const [isFetching, setIsFetching] = useState(false);

  function fetchData(link: string) {
    setTimeout(() => {
      fetchGames(link)
        .then((res) => {
          setNextPage(res.next);
          setGames(games.concat(res.results));
          setIsFetching(false);
        })
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
    fetchData('https://api.rawg.io/api/games?key=66079383234d4dcb920bcfc26e2fb8ae&platforms=4');
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
        { isFetching && <li className='games__preloader'><Preloader /></li> }
      </ul>
    </div>
  )
};

export default MoviesList;