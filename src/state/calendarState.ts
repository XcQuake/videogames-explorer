import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDecade } from 'date-fns';

interface CalendarState {
  year: number;
  month: number;
  day: number;
  decadeStart: number;
  view: string;
}

const date = new Date();

const initialState: CalendarState = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDay(),
  decadeStart: getDecade(date),
  view: 'month',
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
    },
    setDay: (state, action: PayloadAction<number>) => {
      state.day = action.payload;
    },
    setDecade: (state, action: PayloadAction<number>) => {
      state.decadeStart = action.payload;
    },
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
  },
});

export const { setYear, setMonth, setDay, setDecade, setView } =
  calendarSlice.actions;
