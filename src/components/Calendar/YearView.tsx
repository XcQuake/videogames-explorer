import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import DateListElement from './DateListElement';

interface Props {
  onSelect: (month: string) => void;
}

const YearView: React.FC<Props> = ({ onSelect }) => {
  function handleSelectMonth(month: number) {
    onSelect(month < 10 ? `0${month}` : `${month}`);
  }

  const renderMonths = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const stringDate = `${i}, 01, 2000`;
      const fullDate = new Date(stringDate);
      const value = format(fullDate, 'LLL', { locale: ru });

      months.push(
        <DateListElement
          key={`month${i}`}
          value={value}
          onClick={() => handleSelectMonth(i)}
        />
      );
    }
    return months;
  };

  return (
    <div className="calendar__view">
      <ul className="calendar__list">{renderMonths()}</ul>
    </div>
  );
};

export default YearView;
