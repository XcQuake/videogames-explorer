import { combineReducers } from '@reduxjs/toolkit';
import {gamesListSlice }from './gamesListSlice';

const reducers = {
  gamesList: gamesListSlice.reducer,
}

export default reducers;