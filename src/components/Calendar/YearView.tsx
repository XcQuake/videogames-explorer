import React from 'react';

import { useAppDispatch } from '../../hooks/redux-hoos';
import { monthsList } from './calendarData';
import { setMonth, setView } from '../../state/calendarState';

const YearView: React.FC = () => {
  const dispatch = useAppDispatch();

  function handleClickMonth(num: number) {
    dispatch(setMonth(num));
    dispatch(setView('month'));
  }

  return (
    <div className="calendar__view">
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
