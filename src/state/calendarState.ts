import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

enum ActionType {
  SELECT_MONTH = 'select_month',
  SELECT_YEAR = 'select_year',
}

interface CalendarState {
  year: number,
  month: number,
  range: Date[],
  view: string,
}

const date = new Date();

const initialState: CalendarState = {
  year: date.getFullYear(),
  month: date.getMonth(),
  range: [],
  view: 'month',
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setYear: (state, action: PayloadAction<number>) => { state.year = action.payload },
    setMonth: (state, action: PayloadAction<number>) => { state.month = action.payload },
    setRange: (state, action: PayloadAction<Date[]>) => { state.range = action.payload },
    setView: (state, action: PayloadAction<string>) => { state.view = action.payload },
  }
})

export const { setYear, setMonth, setRange, setView } = calendarSlice.actions;