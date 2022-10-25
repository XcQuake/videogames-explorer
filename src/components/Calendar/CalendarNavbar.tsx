import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useAppSelector, useAppDispatch } from '../../hooks/redux-hoos';
import { setView, setMonth, setYear } from '../../state/calendarState';

const CalendarNavbar: React.FC = () => {
  const { year, month, view } = useAppSelector((state) => state.calendar);

  const dispatch = useAppDispatch();
  const monthName = format(new Date(year, month - 1), 'LLLL, yyyy', {
    locale: ru,
  });
  const currentYear = new Date().getFullYear();

  function switchToPreviousMonth() {
    if (month === 1) {
      dispatch(setYear(year - 1));
      dispatch(setMonth(12));
    } else {
      dispatch(setMonth(month - 1));
    }
  }

  function switchToNextMonth() {
    if (month === 12) {
      if (year < currentYear) {
        dispatch(setYear(year + 1));
        dispatch(setMonth(1));
      }
      return;
    } else {
      dispatch(setMonth(month + 1));
    }
  }

  function switchToPreviousYear() {
    dispatch(setYear(year - 1));
  }

  function switchToNextYear() {
    if (year < currentYear) {
      dispatch(setYear(year + 1));
    }
  }

  function handleClickViewButton() {
    switch (view) {
      case 'month':
        return dispatch(setView('year'));
      case 'year':
        return dispatch(setView('month'));
      default:
        return;
    }
  }

  function handleClickPreviousButton() {
    switch (view) {
      case 'month':
        return switchToPreviousMonth();
      case 'year':
        return switchToPreviousYear();
    }
  }

  function handleClickNextButton() {
    switch (view) {
      case 'month':
        return switchToNextMonth();
      case 'year':
        return switchToNextYear();
    }
  }

  const viewTitle = () => {
    switch (view) {
      case 'month':
        return monthName[0].toUpperCase() + monthName.slice(1);
      case 'year':
        return year;
    }
  };

  return (
    <div className="calendar__navigation">
      <button
        className="calendar__button calendar__button_previous"
        onClick={() => handleClickPreviousButton()}
      />
      <button
        className="calendar__button"
        onClick={() => handleClickViewButton()}
        title="Change View"
      >
        {viewTitle()}
      </button>
      <button
        className="calendar__button calendar__button_next"
        onClick={() => handleClickNextButton()}
      />
    </div>
  );
};

export default CalendarNavbar;
