import { createReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import RawgApi from '../../requests/rawgApi';

import { GameResponse } from '../../types/rawgApiTypes';

interface GamesListState {
  games: GameResponse[],
  nextPage: number,
}

export enum ActionType {
  FETCH_GAMESLIST = 'fetch_gameslist',
  CLEAR_GAMESLIST = 'clear_gameslist',
}

const initialState: GamesListState = {
  games: [],
  nextPage: 1,
}

interface args {
  page: number;
  platformId: number | null;
}

export const fetchGamesList = createAsyncThunk(
  ActionType.FETCH_GAMESLIST,
  async ({page, platformId}: args) => {
    const response = await RawgApi.getGamesList(page, platformId);
    return response;
  }
)

export const gamesListSlice = createSlice({
  name: 'gamesList',
  initialState,
  reducers: {
    clearGamesList: (state) => { state.games = [] },
  },
  extraReducers(builder) {
    builder.addCase(fetchGamesList.fulfilled, (state, action) => {
      state.games = state.games.concat(action.payload.results);
      state.nextPage = action.payload.next ? state.nextPage + 1 : 0;
    })
  },
})

export const { clearGamesList } = gamesListSlice.actions;