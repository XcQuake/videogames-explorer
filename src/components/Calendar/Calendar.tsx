import React, { useState } from 'react';

import './Calendar.scss';
import { useAppSelector } from '../../hooks/redux-hoos';
import MonthView from './MonthView';
import CalendarNavbar from './CalendarNavbar';
import YearView from './YearView';
import DecadeView from './DecadeView';

interface Props {
  view: 'decade' | 'year' | 'month';
  onSelect: (date: number) => void;
}

const Calendar: React.FC<Props> = ({ view, onSelect }) => {
  return (
    <div className="calendar">
      <CalendarNavbar />
      {view === 'decade' && (
        <DecadeView onSelect={(year: number) => onSelect(year)} />
      )}
      {view === 'year' && (
        <YearView onSelect={(month: number) => onSelect(month)} />
      )}
      {view === 'month' && (
        <MonthView onSelect={(day: number) => onSelect(day)} />
      )}
    </div>
  );
};

export default Calendar;
