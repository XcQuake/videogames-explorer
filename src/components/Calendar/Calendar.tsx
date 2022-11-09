import React from 'react';

import './Calendar.scss';
import YearView from './YearView';
import DecadeView from './DecadeView';

interface Props {
  view: 'decade' | 'year' | 'month';
  onSelect: (date: string) => void;
}

const Calendar: React.FC<Props> = ({ view, onSelect }) => {
  return (
    <div className="calendar">
      {view === 'decade' && (
        <DecadeView onSelect={(date: string) => onSelect(date)} />
      )}
      {view === 'year' && (
        <YearView onSelect={(date: string) => onSelect(date)} />
      )}
    </div>
  );
};

export default Calendar;
