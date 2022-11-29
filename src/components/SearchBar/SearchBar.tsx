import React, { useState, useEffect } from 'react';

import { searchGames } from '../../state/gamesListState';
import { useAppDispatch } from '../../hooks/redux-hoos';

import './SearchBar.scss';

const SearchBar: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!inputText) return;
    const timer = setTimeout(() => {
      dispatch(searchGames(inputText)).then((data) => console.log(data));
    }, 1500);

    return () => clearTimeout(timer);
  }, [inputText]);

  return (
    <div className="search-bar">
      <button className="search-bar__options" />
      <input
        className="search-bar__input"
        placeholder="Название игры"
        name="game_name"
        type="text"
        maxLength={250}
        minLength={2}
        onChange={(evt) => setInputText(evt.target.value)}
      />
    </div>
  );
};

export default SearchBar;
