import React, { useEffect, useState } from 'react';
import { getDaysInMonth, format, parseISO, compareAsc } from 'date-fns';
import { ru } from 'date-fns/locale';

import './Calendar.scss';
import { useAppSelector } from '../../hooks/redux-hoos';
import MonthView from './MonthView';
import CalendarNavbar from './CalendarNavbar';
import YearView from './YearView';

const Calendar: React.FC = () => {
  const { view } = useAppSelector((state) => state.calendar);

  return (
    <div className="calendar">
      <CalendarNavbar />
      {view === 'month' && <MonthView />}
      {view === 'year' && <YearView />}
    </div>
  );
};

export default Calendar;
