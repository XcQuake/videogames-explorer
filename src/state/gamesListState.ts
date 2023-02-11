import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import RawgApi from '../requests/rawgApi';
import { GameResponse } from '../types/rawgApiTypes';

enum ActionType {
  FETCH_GAMESLIST = 'fetch_gameslist',
  CLEAR_GAMESLIST = 'clear_gameslist',
  SEARCH_GAMES = 'search_games',
}

interface GamesListState {
  games: GameResponse[];
  nextPage: number;
  isGamesListLoading: boolean;
  releaseDates: string;
}

const initialState: GamesListState = {
  games: [],
  nextPage: 1,
  isGamesListLoading: false,
  releaseDates: '2023-01-01,2023-12-30',
};

export const gamesListSlice = createSlice({
  name: 'gamesList',
  initialState,
  reducers: {
    clearGamesList: (state) => {
      state.games = [];
    },
    setReleaseDates: (state, action: PayloadAction<string>) => {
      state.releaseDates = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchGamesList.pending, (state) => {
      state.isGamesListLoading = true;
    });
    builder.addCase(fetchGamesList.fulfilled, (state, action) => {
      state.games = state.games.concat(action.payload.results);
      state.nextPage = action.payload.next ? state.nextPage + 1 : 0;
      state.isGamesListLoading = false;
    });
    builder.addCase(searchGames.pending, (state) => {
      state.games = [];
      state.isGamesListLoading = true;
    });
    builder.addCase(searchGames.fulfilled, (state, action) => {
      state.games = state.games.concat(action.payload.results);
      state.nextPage = action.payload.next ? state.nextPage + 1 : 0;
      state.isGamesListLoading = false;
    });
  },
});

export const { clearGamesList, setReleaseDates } = gamesListSlice.actions;
export const fetchGamesList = createAsyncThunk(
  ActionType.FETCH_GAMESLIST,
  async ({
    page,
    platformId,
    releaseDates,
  }: {
    page?: number;
    platformId?: number | null;
    releaseDates?: string;
  }) => await RawgApi.getGamesList(page, platformId, releaseDates)
);

export const searchGames = createAsyncThunk(
  ActionType.SEARCH_GAMES,
  async (searchText: string) => await RawgApi.searchGames(searchText)
);
