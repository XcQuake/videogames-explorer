import React from 'react';

import './Calendar.scss';
import YearView from './YearView';
import DecadeView from './DecadeView';

interface Props {
  view: 'decade' | 'year' | 'month';
  onSelect: (date: number) => void;
}

const Calendar: React.FC<Props> = ({ view, onSelect }) => {
  return (
    <div className="calendar">
      {view === 'decade' && (
        <DecadeView onSelect={(year: number) => onSelect(year)} />
      )}
      {view === 'year' && (
        <YearView onSelect={(month: number) => onSelect(month)} />
      )}
    </div>
  );
};

export default Calendar;
