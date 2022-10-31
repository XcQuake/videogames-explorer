import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hoos';
import { setYear } from '../../state/calendarState';
import DateListElement from './DateListElement';

interface Props {
  onSelect: (date: number) => void;
}

const DecadeView: React.FC<Props> = ({ onSelect }) => {
  const { decadeStart } = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();

  function handleSelectDate(year: number) {
    dispatch(setYear(year));
    onSelect(year);
  }

  const renderYears = () => {
    const years = [];
    for (let i = decadeStart; i < decadeStart + 10; i++) {
      years.push(
        <DateListElement
          key={`year${i}`}
          value={i.toString()}
          onClick={() => handleSelectDate(i)}
        />
      );
    }
    return years;
  };

  return (
    <div className="calendar__view">
      <ul className="calendar__list calendar__list_decade">{renderYears()}</ul>
    </div>
  );
};

export default DecadeView;
