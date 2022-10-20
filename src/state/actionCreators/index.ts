import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from '../actions';

import RawgApi from '../../requests/rawgApi';

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
