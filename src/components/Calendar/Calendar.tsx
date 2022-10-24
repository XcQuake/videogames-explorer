import React, { useEffect, useState } from 'react';
import {
  getDaysInMonth,
  format,
  parseISO,
  compareAsc,
} from 'date-fns'
import { ru } from 'date-fns/locale';

import './Calendar.scss';
import { useAppSelector } from '../../hooks/redux-hoos';
import { monthsList } from './calendarData';
import MonthView from './MonthView/MonthView';
import CalendarNavbar from './CalendarNavbar/CalendarNavbar';

const Calendar: React.FC = () => {
  const { year, month, range, view } = useAppSelector((state) => state.calendar);
  
  // const renderYearView = () => {
  //   return (
  //     <div className='calendar__view'>
  //       <button className='calendar__button' onClick={() => setCurrentView('decade')}>
  //         {year}
  //       </button>
  //       <ul className='calendar__list calendar__list_year'>
  //         {
  //           monthsList.map((month) => <li
  //               className='calendar__month'
  //               key={month.id}
  //               onClick={() => handleMonthCLick(month)}
  //             >{month.shortName}</li>)
  //         }
  //       </ul>
  //     </div>
  //   )
  // }

  return (
    <div className='calendar'>
      <CalendarNavbar />
      {view === 'month' && <MonthView />}
    </div>
  );
}

export default Calendar;