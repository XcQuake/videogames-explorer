import React, { useState, useEffect } from 'react';
import { format, getDaysInMonth, compareAsc } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hoos';
import { setRangeValue, setRange } from '../../state/calendarState';

const MonthView: React.FC = () => {
  const { year, month, range } = useAppSelector((state) => state.calendar);
  const [isDragged, setIsDragged] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const dispatch = useAppDispatch();

  const monthLength: number = getDaysInMonth(new Date(month - 1));
  const monthStart: string = format(new Date(year, month - 1), 'i'); // День недели с которого начианется месяц

  const pickedDates = {
    early: new Date(range[0]),
    late: new Date(range[1]),
  };

  useEffect(() => {
    dispatch(setRange(['2022-10-1', '2022-10-23']));
  }, []);

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= monthLength; i++) {
      const stringDate = `${year}-${month}-${i}`; // Дата в виде string
      const fullDate = new Date(stringDate); // Дата в виде Date

      // Выбрана ли эта дата
      const isPickedDay =
        (range[0] === stringDate && !compareAsc(fullDate, pickedDates.early)) ||
        (range[1] === stringDate && !compareAsc(fullDate, pickedDates.late));

      // Находится ли эта в диапозоне выбранных дат
      const inRange =
        !isDragged &&
        compareAsc(fullDate, pickedDates.early) > 0 &&
        compareAsc(fullDate, pickedDates.late) < 0;

      // Находится ли эта дата в диапозоне между первой выбранной датой и датой, на которую наведена мышь
      const isEarlierThanFirstDay =
        hoverDate &&
        compareAsc(pickedDates.early, hoverDate) > 0 &&
        compareAsc(fullDate, hoverDate) > 0 &&
        compareAsc(fullDate, pickedDates.early) < 0;

      const isLaterThanFirstDay =
        hoverDate &&
        compareAsc(pickedDates.early, hoverDate) < 0 &&
        compareAsc(fullDate, hoverDate) < 0 &&
        compareAsc(fullDate, pickedDates.early) > 0;

      const inPreview = isEarlierThanFirstDay || isLaterThanFirstDay;

      days.push(
        <li
          className="calendar__day"
          key={`day${i}`}
          style={{
            gridColumnStart: i === 1 ? monthStart : 'auto',
            backgroundColor: isPickedDay
              ? '#6B69F9'
              : inRange || inPreview
              ? '#6b69f946'
              : 'inherit',
          }}
          onClick={() => {
            if (!isDragged) {
              setIsDragged(true);
              dispatch(setRangeValue(stringDate));
            } else {
              dispatch(setRangeValue(stringDate));
              setIsDragged(false);
            }
          }}
          onMouseEnter={() => {
            isDragged && setHoverDate(fullDate);
          }}
        >
          {i}
        </li>
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
