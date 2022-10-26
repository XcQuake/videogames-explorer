import React from 'react';
import { format } from 'date-fns';

import { useAppSelector } from '../../hooks/redux-hoos';

const DateControls: React.FC = () => {
  const { range } = useAppSelector((state) => state.calendar);

  const rangeDates = {
    early: new Date(range[0]),
    late: new Date(range[1]),
  };

  const firstYearInRange = rangeDates.early.getFullYear();
  const secondYearInRange = range[1] && rangeDates.late.getFullYear();

  const firstMonthInRange = rangeDates.early.getMonth() + 1;
  const secondMonthInRange = range[1] && rangeDates.late.getMonth() + 1;

  const renderYearsLabel = () => {
    if (secondYearInRange && secondYearInRange !== firstYearInRange) {
      return `${firstYearInRange} - ${secondYearInRange}`;
    }
    return `${firstYearInRange}`;
  };

  const renderMonthsLabel = () => {
    if (secondMonthInRange && secondMonthInRange !== firstMonthInRange) {
      return `${format(rangeDates.early, 'LLLL')} - ${format(
        rangeDates.late,
        'LLLL'
      )}`;
    }
    return `${format(rangeDates.early, 'LLLL')}`;
  };

  return (
    <div className="controls__dates">
      <div className="controls__year">
        Год
        <button className="controls__button">
          {renderYearsLabel()}
          <span className="icon__down-arrow" />
        </button>
      </div>
      <div className="controls__year">
        Месяц
        <button className="controls__button">
          {firstMonthInRange && renderMonthsLabel()}
          <span className="icon__down-arrow" />
        </button>
      </div>
    </div>
  );
};

export default DateControls;
