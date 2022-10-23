import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import RawgApi from '../requests/rawgApi';
import { GameResponse } from '../types/rawgApiTypes';

enum ActionType {
  FETCH_GAMESLIST = 'fetch_gameslist',
  CLEAR_GAMESLIST = 'clear_gameslist',
}

interface GamesListState {
  games: GameResponse[],
  nextPage: number,
  isGamesListLoading: boolean,
}

const initialState: GamesListState = {
  games: [],
  nextPage: 1,
  isGamesListLoading: false,
}

export const gamesListSlice = createSlice({
  name: 'gamesList',
  initialState,
  reducers: {
    clearGamesList: (state) => { state.games = [] },
  },
  extraReducers(builder) {
    builder.addCase(fetchGamesList.pending, (state) => {
      state.isGamesListLoading = true;
    })
    builder.addCase(fetchGamesList.fulfilled, (state, action) => {
      state.games = state.games.concat(action.payload.results);
      state.nextPage = action.payload.next ? state.nextPage + 1 : 0;
      state.isGamesListLoading = false;
    })
  },
})

export const { clearGamesList } = gamesListSlice.actions;
export const fetchGamesList = createAsyncThunk(
  ActionType.FETCH_GAMESLIST,
  async ({page, platformId}: { page: number, platformId: number | null}) => await RawgApi.getGamesList(page, platformId)
);