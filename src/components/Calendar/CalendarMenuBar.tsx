import React from 'react';

import { useAppSelector } from '../../hooks/redux-hoos';

const CalendarMenuBar: React.FC = () => {
  const { range } = useAppSelector((state) => state.calendar);

  const firstYearInRange = new Date(range[0]).getFullYear();
  const secondYearInRange = range[1] && new Date(range[1]).getFullYear();

  const renderYearSelectOptions = () => {
    if (secondYearInRange && secondYearInRange !== firstYearInRange) {
      return `${firstYearInRange} - ${secondYearInRange}`;
    }
    return `${firstYearInRange}`;
  };

  return (
    <div className="calendar-menubar">
      <div className="calendar-menubar__selection">
        <label>Year</label>
        <button className="calendar__button calendar__button_select">
          {renderYearSelectOptions()}
          <span className="calendar__down-arrow" />
        </button>
      </div>
    </div>
  );
};

export default CalendarMenuBar;
