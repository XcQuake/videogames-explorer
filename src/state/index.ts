import { configureStore } from '@reduxjs/toolkit';

import { calendarSlice } from './calendarState';
import { gamesListSlice } from './gamesListState';

export const store = configureStore({
  reducer: {
    gamesList: gamesListSlice.reducer,
    calendar: calendarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
