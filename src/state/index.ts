import { configureStore } from '@reduxjs/toolkit';
import { gamesListSlice } from './reducers/gamesListSlice';

export const store = configureStore({
  reducer: {
    gamesList: gamesListSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;