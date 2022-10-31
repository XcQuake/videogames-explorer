import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hoos';
import DateListElement from './DateListElement';
import { setMonth } from '../../state/calendarState';

interface Props {
  onSelect: (month: number) => void;
}

const YearView: React.FC<Props> = ({ onSelect }) => {
  const { year } = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();

  function handleSelectMonth(month: number) {
    onSelect(month);
    dispatch(setMonth(month));
  }

  const renderMonths = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const stringDate = `${year}-${i}-1`;
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
      <ul className="calendar__list calendar__list_year">{renderMonths()}</ul>
    </div>
  );
};

export default YearView;
