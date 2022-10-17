import React, { useEffect, useState } from 'react';

import './GamesList.scss';
import { GameResponse } from '../../types/rawgApiTypes';
import { fetchGames } from '../../requests/rawgApi';
import Preloader from '../Preloader/Preloader';
import GameCard from '../GameCard/GameCard';

interface Props {
  platformId: number | null;
}

const GamesList: React.FC<Props> = ({ platformId }) => {
  const [games, setGames] = useState<GameResponse[]>([]);
  const [nextPage, setNextPage] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [platform, setPlatform] = useState<number | null>(platformId);

  function fetchData(page: number){
    setTimeout(() => {
      fetchGames(page, platform)
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

  useEffect(() => {
    setPlatform(platformId);
    fetchData(1);
  }, [platformId])

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    if (!nextPage) return;
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
      { isFetching && <div className='games__preloader'><Preloader /></div> }
    </div>
  )
};

export default GamesList;