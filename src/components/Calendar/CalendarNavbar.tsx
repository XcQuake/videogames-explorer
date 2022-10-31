import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useAppSelector, useAppDispatch } from '../../hooks/redux-hoos';
import {
  setView,
  setMonth,
  setYear,
  setDecade,
} from '../../state/calendarState';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const CalendarNavbar: React.FC = () => {
  const { year, month, view, decadeStart } = useAppSelector(
    (state) => state.calendar
  );

  const dispatch = useAppDispatch();
  const monthName = format(new Date(year, month - 1), 'LLLL, yyyy', {
    locale: ru,
  });

  function switchToPrevMonth() {
    if (month === 1) return;
    dispatch(setMonth(month - 1));
  }

  function switchToNextMonth() {
    if (month === 12) return;
    dispatch(setMonth(month + 1));
  }

  function switchToPrevYear() {
    dispatch(setYear(year - 1));
  }

  function switchToNextYear() {
    dispatch(setYear(year + 1));
  }

  function switchToPrevDecade() {
    dispatch(setDecade(decadeStart - 10));
  }

  function switchToNextDecade() {
    dispatch(setDecade(decadeStart + 10));
  }

  function handleClickViewButton() {
    switch (view) {
      case 'month':
        return dispatch(setView('year'));
      case 'year':
        return dispatch(setView('decade'));
      case 'decade':
        return dispatch(setView('month'));
      default:
        return;
    }
  }

  function handleClickPrevButton() {
    switch (view) {
      case 'month':
        return switchToPrevMonth();
      case 'year':
        return switchToPrevYear();
      case 'decade':
        return switchToPrevDecade();
    }
  }

  function handleClickNextButton() {
    switch (view) {
      case 'month':
        return switchToNextMonth();
      case 'year':
        return switchToNextYear();
      case 'decade':
        return switchToNextDecade();
    }
  }

  const viewTitle = () => {
    switch (view) {
      case 'month':
        return monthName[0].toUpperCase() + monthName.slice(1);
      case 'year':
        return year;
      case 'decade':
        return `${decadeStart} - ${decadeStart + 9}`;
    }
  };

  return (
    <div className="calendar-navbar">
      <Button
        size="small"
        color="inherit"
        onClick={() => handleClickPrevButton()}
      >
        <Icon color="black" name="arrow_left" />
      </Button>
      <Button
        size="small"
        color="inherit"
        onClick={() => handleClickViewButton()}
      >
        {viewTitle()}
      </Button>
      <Button
        size="small"
        color="inherit"
        onClick={() => handleClickNextButton()}
      >
        <Icon color="black" name="arrow_right" />
      </Button>
    </div>
  );
};

export default CalendarNavbar;
