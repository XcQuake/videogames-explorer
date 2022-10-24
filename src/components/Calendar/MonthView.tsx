import React, { useState, useEffect } from 'react';
import { format, getDaysInMonth, compareAsc } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hoos';
import { setRangeValue, setRange } from '../../state/calendarState';

const MonthView: React.FC = () => {
  const { year, month, range } = useAppSelector((state) => state.calendar);
  const [isDragged, setIsDragged] = useState(false);

  const dispatch = useAppDispatch();

  const monthLength: number = getDaysInMonth(new Date(month - 1));
  const monthStart: string = format(new Date(year, month - 1), 'i');

  const pickedDates = {
    early: new Date(range[0]),
    late: new Date(range[1]),
  };

  useEffect(() => {
    dispatch(setRange(['2022-10-1', '2022-10-23']))
  }, []);

  const renderDays = () => {
    const days = [];
    for (let i = 1; i<=monthLength; i++) {
      const stringDate = `${year}-${month}-${i}`;
      const fullDate = new Date(stringDate);

      const isPickedDay =
        (range[0] === stringDate && !compareAsc(fullDate, pickedDates.early))
        || (range[1] === stringDate && !compareAsc(fullDate, pickedDates.late))
      
      const isInterDay =
        (!isDragged && compareAsc(fullDate, pickedDates.early) > 0) 
        && (!isDragged && compareAsc(fullDate, pickedDates.late) < 0)

      days.push(
        <li
          className='calendar__day'
          key={`day${i}`}
          style={{
            gridColumnStart: i === 1 ? monthStart : 'auto',
            backgroundColor: isPickedDay ? '#6B69F9' : isInterDay ? '#6b69f946' : 'inherit',
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
        >{i}</li>
      )
    };
    return days;
  };

  return (
    <div className='calendar__view'>
      <ul className='calendar__list calendar__list_month'>
        <li className='calendar__weekday'>п</li>
        <li className='calendar__weekday'>в</li>
        <li className='calendar__weekday'>с</li>
        <li className='calendar__weekday'>ч</li>
        <li className='calendar__weekday'>п</li>
        <li className='calendar__weekday'>с</li>
        <li className='calendar__weekday'>в</li>
        {renderDays()}
      </ul>
    </div>
  )
};

export default MonthView;