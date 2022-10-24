import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useAppSelector, useAppDispatch } from '../../hooks/redux-hoos';
import { setView, setMonth } from '../../state/calendarState';

const CalendarNavbar: React.FC = () => {
  const { year, month } = useAppSelector((state) => state.calendar);

  const dispatch = useAppDispatch();
  const monthName = format(new Date(`${year}-${month}`), 'LLLL, yyyy', {locale: ru});

  return (
    <div className='calendar__navigation'>
      <button className='calendar__button calendar__button_previous' onClick={() => dispatch(setMonth(month - 1))}/>
      <button className='calendar__button' onClick={() => setView('year')}>
        {monthName[0].toUpperCase() + monthName.slice(1)}
      </button>
      <button className='calendar__button calendar__button_next' onClick={() => dispatch(setMonth(month + 1))}/>
    </div>
  )
}

export default CalendarNavbar;