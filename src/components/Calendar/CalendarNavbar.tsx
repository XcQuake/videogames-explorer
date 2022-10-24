import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useAppSelector, useAppDispatch } from '../../hooks/redux-hoos';
import { setView, setMonth, setYear } from '../../state/calendarState';

const CalendarNavbar: React.FC = () => {
  const { year, month } = useAppSelector((state) => state.calendar);

  const dispatch = useAppDispatch();
  const monthName = format(new Date(year, month - 1), 'LLLL, yyyy', {locale: ru});

  function handleClickNextMonth() {
    if (month === 12) {
      dispatch(setYear(year + 1));
      dispatch(setMonth(1));
    } else {
      dispatch(setMonth(month + 1));
    }
  }

  function handleClickPreviousMonth() {
    if (month === 1) {
      dispatch(setYear(year - 1));
      dispatch(setMonth(12));
    } else {
      dispatch(setMonth(month - 1));
    }
  }

  return (
    <div className='calendar__navigation'>
      <button className='calendar__button calendar__button_previous' onClick={() => handleClickPreviousMonth()}/>
      <button className='calendar__button' onClick={() => setView('year')}>
        {monthName[0].toUpperCase() + monthName.slice(1)}
      </button>
      <button className='calendar__button calendar__button_next' onClick={() => handleClickNextMonth()}/>
    </div>
  )
}

export default CalendarNavbar;