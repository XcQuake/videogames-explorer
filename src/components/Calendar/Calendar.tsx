import React from 'react';

import './Calendar.scss';
import { useAppSelector } from '../../hooks/redux-hoos';
import MonthView from './MonthView';
import CalendarNavbar from './CalendarNavbar';
import YearView from './YearView';
import MenuBar from './CalendarMenuBar';

const Calendar: React.FC = () => {
  const { view } = useAppSelector((state) => state.calendar);

  return (
    <div className="calendar">
      <MenuBar />
      <CalendarNavbar />
      {view === 'month' && <MonthView />}
      {view === 'year' && <YearView />}
    </div>
  );
};

export default Calendar;
