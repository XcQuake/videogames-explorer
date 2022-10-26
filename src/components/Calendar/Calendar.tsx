import React from 'react';

import './Calendar.scss';
import { useAppSelector } from '../../hooks/redux-hoos';
import MonthView from './MonthView';
import CalendarNavbar from './CalendarNavbar';
import YearView from './YearView';
import DecadeView from './DecadeView';

const Calendar: React.FC = () => {
  const { view } = useAppSelector((state) => state.calendar);

  return (
    <div className="calendar">
      <CalendarNavbar />
      {view === 'month' && <MonthView />}
      {view === 'year' && <YearView />}
      {view === 'decade' && <DecadeView />}
    </div>
  );
};

export default Calendar;
