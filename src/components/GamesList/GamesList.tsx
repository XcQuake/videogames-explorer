import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './GamesList.scss';
import GameCard from '../GameCard/GameCard';
import { fetchGamesList, clearGamesList } from '../../state/gamesListState';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hoos';
import Controls from '../Controls/Controls';
import GridElement from '../GridElement/GridElement';
import { RAWG_API } from '../../utils/contants';
import Placeholder from '../Placeholder/Placeholder';

interface Props {}

type Params = {
  id: string | undefined;
};

const GamesList: React.FC<Props> = () => {
  const { games, nextPage, isGamesListLoading, releaseDates } = useAppSelector(
    (state) => state.gamesList
  );
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { id = 'pc' } = useParams<Params>();
  const platformId = RAWG_API.platforms[id as keyof typeof RAWG_API.platforms];

  async function fetchData(page: number) {
    await dispatch(fetchGamesList({ page, platformId, releaseDates }));
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
  }, [platformId, releaseDates]);

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
        {/* Loading Skeleton */}
        {(isScrolled || isGamesListLoading) &&
          Array(10)
            .fill('')
            .map((item, i) => (
              <GridElement gapSpan={2} key={`placeholder-${i}`}>
                <Placeholder.Card />
              </GridElement>
            ))}
      </div>
    </div>
  );
};

export default GamesList;
