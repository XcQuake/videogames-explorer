import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hoos';
import { setYear } from '../../state/calendarState';

import DateListElement from './DateListElement';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

interface Props {
  onSelect: (date: number) => void;
}

const DecadeView: React.FC<Props> = ({ onSelect }) => {
  const [decade, setDecade] = useState(2020);
  const dispatch = useAppDispatch();

  const title = `${decade} - ${decade + 9}`;

  function handleClickPrevButton() {
    setDecade(decade - 10);
  }

  function handleClickNextButton() {
    setDecade(decade + 10);
  }

  function handleSelectDate(year: number) {
    dispatch(setYear(year));
    onSelect(year);
  }

  const renderYears = () => {
    const years = [];
    for (let i = decade; i < decade + 10; i++) {
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
    <>
      <div className="calendar-navbar">
        <Button
          size="small"
          color="inherit"
          onClick={() => handleClickPrevButton()}
        >
          <Icon color="black" name="arrow_left" />
        </Button>
        <Button size="small" color="inherit">
          {title}
        </Button>
        <Button
          size="small"
          color="inherit"
          onClick={() => handleClickNextButton()}
        >
          <Icon color="black" name="arrow_right" />
        </Button>
      </div>
      <div className="calendar__view">
        <ul className="calendar__list calendar__list_decade">
          {renderYears()}
        </ul>
      </div>
    </>
  );
};

export default DecadeView;
