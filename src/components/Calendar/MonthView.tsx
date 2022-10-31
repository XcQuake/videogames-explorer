import React from 'react';
import { format, getDaysInMonth } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hoos';
import { setDay } from '../../state/calendarState';
import DateListElement from './DateListElement';

interface Props {
  onSelect: (day: number) => void;
}

const MonthView: React.FC<Props> = ({ onSelect }) => {
  const { year, month } = useAppSelector((state) => state.calendar);

  const dispatch = useAppDispatch();

  const monthLength: number = getDaysInMonth(new Date(month - 1));
  const monthStart: string = format(new Date(year, month - 1), 'i'); // День недели с которого начианется месяц

  function handleSelectDay(day: number) {
    dispatch(setDay(day));
    onSelect(day);
  }

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= monthLength; i++) {
      days.push(
        <DateListElement
          key={`month${i}`}
          value={i.toString()}
          onClick={() => handleSelectDay(i)}
          style={{
            gridColumnStart: i === 1 ? monthStart : 'auto',
          }}
        />
      );
    }
    return days;
  };

  return (
    <div className="calendar__view">
      <ul className="calendar__list calendar__list_month">
        <li className="calendar__weekday">п</li>
        <li className="calendar__weekday">в</li>
        <li className="calendar__weekday">с</li>
        <li className="calendar__weekday">ч</li>
        <li className="calendar__weekday">п</li>
        <li className="calendar__weekday">с</li>
        <li className="calendar__weekday">в</li>
        {renderDays()}
      </ul>
    </div>
  );
};

export default MonthView;
