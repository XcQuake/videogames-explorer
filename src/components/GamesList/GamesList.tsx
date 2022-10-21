import React, { useEffect, useState } from 'react';

import './GamesList.scss';
import Preloader from '../Preloader/Preloader';
import GameCard from '../GameCard/GameCard';
import { fetchGamesList, clearGamesList } from '../../state/slices/gamesListSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hoos';

interface Props {
  platformId: number | null;
}

const GamesList: React.FC<Props> = ({ platformId }) => {
  const { games, nextPage } = useAppSelector((state) => state.gamesList);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  async function fetchData(page: number){
    await dispatch(fetchGamesList({page, platformId}))
    setIsFetching(false);
  };

  useEffect(() => {
    if (!nextPage) return setIsFetching(false);
    if (!isFetching) return;

    const timer = setTimeout(() => {
      fetchData(nextPage);
    }, 500)

    return () => clearTimeout(timer);
  }, [isFetching]);

  useEffect(() => {
    dispatch(clearGamesList());
    fetchData(1);
  }, [platformId])

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true);
  };

  useEffect(() => {
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
      { isFetching && <Preloader /> }
    </div>
  )
};

export default GamesList;