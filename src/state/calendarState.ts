import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { compareAsc, getDecade } from 'date-fns';

interface CalendarState {
  year: number;
  month: number;
  decadeStart: number;
  range: string[];
  view: string;
}

const date = new Date();

const initialState: CalendarState = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  decadeStart: getDecade(date),
  range: [],
  view: 'month',
};

let tempDatesArr: string[] = []; // Временное хранилище для строк дат, перед сортировкой по времени.

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setDecade: (state, action: PayloadAction<number>) => {
      state.decadeStart = action.payload;
    },
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
    setRangeValue: (state, action: PayloadAction<string>) => {
      tempDatesArr.push(action.payload);
      if (tempDatesArr.length < 2) {
        // Если выбрана тольке первая дата в календаре
        state.range = []; // Очищается прошлый выбор диапозона
        state.range.push(action.payload); // Первая дата диапозона помещается в стейт
      } else {
        // После выбора второй даты
        state.range = tempDatesArr.sort((a, b) =>
          compareAsc(new Date(a), new Date(b))
        ); // Проводится сортировка дат по возрастанию
        tempDatesArr = []; // Очищается временное хранилище
      }
    },
    setRange: (state, action: PayloadAction<string[]>) => {
      state.range = action.payload.sort((a, b) =>
        compareAsc(new Date(a), new Date(b))
      );
    },
  },
});

export const {
  setMonth,
  setYear,
  setDecade,
  setView,
  setRangeValue,
  setRange,
} = calendarSlice.actions;
