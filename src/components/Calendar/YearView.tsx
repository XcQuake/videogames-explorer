import React from 'react';

import { useAppSelector } from '../../hooks/redux-hoos';
import { useAppDispatch } from '../../hooks/redux-hoos';
import { monthsList } from './calendarData';
import { setMonth, setView, setYear } from '../../state/calendarState';

const YearView: React.FC = () => {
  const { year, month, range } = useAppSelector((state) => state.calendar);

  const dispatch = useAppDispatch();

  function handleClickMonth(num: number) {
    dispatch(setMonth(num));
    dispatch(setView('month'));
  }

  return (
    <div className="calendar__view">
      {/* <button
        className="calendar__button"
        onClick={() => setCurrentView('decade')}
      >
        {year}
      </button> */}
      <ul className="calendar__list calendar__list_year">
        {monthsList.map((element) => (
          <li
            className="calendar__month"
            key={element.id}
            onClick={() => handleClickMonth(element.num)}
          >
            {element.shortName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YearView;
