import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './GamesList.scss';
import Preloader from '../Preloader/Preloader';
import GameCard from '../GameCard/GameCard';
import { RootState } from '../../state';
import { useActions } from '../../hooks/useActions';
import { gamesListSlice } from '../../state/reducers/gamesListSlice';

interface Props {
  platformId: number | null;
}

const GamesList: React.FC<Props> = ({ platformId }) => {
  const { games, nextPage } = useSelector((state: RootState) => state.gamesList);
  const { fetchGamesList } = useActions();
  const { clearGamesList } = gamesListSlice.actions;
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const dispatch = useDispatch();

  async function fetchData(page: number){
    await fetchGamesList({page, platformId})
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