import React, { useEffect, useState } from 'react';

import './GamesList.scss';
import Preloader from '../Preloader/Preloader';
import GameCard from '../GameCard/GameCard';
import { fetchGamesList, clearGamesList } from '../../state/gamesListState';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hoos';
import Controls from '../Controls/Controls';
import GridElement from '../GridElement/GridElement';

interface Props {
  platformId: number | null;
}

const GamesList: React.FC<Props> = ({ platformId }) => {
  const { games, nextPage, isGamesListLoading } = useAppSelector(
    (state) => state.gamesList
  );
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  async function fetchData(page: number) {
    await dispatch(fetchGamesList({ page, platformId }));
    setIsScrolled(false);
  }

  useEffect(() => {
    if (!nextPage) return setIsScrolled(false);
    if (!isScrolled) return;

    const timer = setTimeout(() => {
      fetchData(nextPage);
    }, 500);

    return () => clearTimeout(timer);
  }, [isScrolled]);

  useEffect(() => {
    dispatch(clearGamesList());
    fetchData(1);
  }, [platformId]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsScrolled(true);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="games">
      <div className="games__list">
        <GridElement gapSpan={2}>
          <Controls />
        </GridElement>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {(isScrolled || isGamesListLoading) && <Preloader />}
    </div>
  );
};

export default GamesList;
