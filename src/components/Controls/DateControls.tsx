import React, { useEffect, useRef, useState } from 'react';
import { compareAsc, getDaysInMonth } from 'date-fns';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Calendar from '../Calendar/Calendar';
import PopoverTrigger from '../Popover/PopoverTrigger';
import { formatMonths } from '../../utils';
import { useAppDispatch } from '../../hooks/redux-hoos';
import { setReleaseDates } from '../../state/gamesListState';

interface Ref {
  root: HTMLElement | null;
  open: () => void;
  close: () => void;
}

const DateControls: React.FC = () => {
  const [showMonths, setShowMonths] = useState<boolean>(false);
  const [years, setYears] = useState<string[]>(['2023']);
  const [months, setMonths] = useState<string[]>(['01', '12']);

  const dispatch = useAppDispatch();
  const triggerRef = useRef<Ref>() as React.MutableRefObject<Ref>;
  const formattedMonths = formatMonths(months[0], months[1]);

  const selectedYears = {
    first: years[0],
    second: years[1],
  };

  const selectedMonths = {
    first: months[0],
    second: months[1],
  };

  const handleSelectFirstYear = (year: string) => {
    setYears([year]);
    triggerRef.current.close();
  };

  const handleSelectSecondYear = (year: string) => {
    if (year === selectedYears.first) return;
    setYears(
      [selectedYears.first, year].sort((x, y) =>
        compareAsc(new Date(x), new Date(y))
      )
    );
    triggerRef.current.close();
  };

  const handleSelectFirstMonth = (month: string) => {
    setMonths([month]);
    triggerRef.current.close();
  };

  const handleSelectSecondMonth = (month: string) => {
    if (month === selectedMonths.first) return;
    setMonths(
      [selectedMonths.first, month].sort((x, y) =>
        compareAsc(new Date(x), new Date(y))
      )
    );
    triggerRef.current.close();
  };

  useEffect(() => {
    if (years.length < 2) {
      setShowMonths(true);
      setMonths(['01', '12']);
    } else {
      setMonths([]);
      setShowMonths(false);
    }
  }, [years]);

  useEffect(() => {
    if (years.length === 2) {
      dispatch(
        setReleaseDates(
          `${selectedYears.first}-01-01,${selectedYears.second}-12-31`
        )
      );
    } else {
      const daysInMonth = getDaysInMonth(
        new Date(
          +selectedYears.first,
          (+selectedMonths.second - 1) | (+selectedMonths.first - 1)
        )
      );
      dispatch(
        setReleaseDates(
          `${selectedYears.first}-${selectedMonths.first}-01,${
            selectedYears.first
          }-${selectedMonths.second || selectedMonths.first}-${daysInMonth}`
        )
      );
    }
  }, [years, months]);

  return (
    <div className="controls__dates">
      <div className="controls__date">
        Год:
        <div className="controls__buttons">
          <PopoverTrigger
            ref={triggerRef}
            content={
              <Calendar
                view="decade"
                onSelect={(year: string) => handleSelectFirstYear(year)}
              />
            }
          >
            <Button color="secondary" size="small">
              {selectedYears.first}
              <Icon name="arrow_down" size="small" color="white" />
            </Button>
          </PopoverTrigger>
          -
          <PopoverTrigger
            ref={triggerRef}
            content={
              <Calendar
                view="decade"
                onSelect={(year: string) => handleSelectSecondYear(year)}
              />
            }
          >
            <Button color="secondary" size="small">
              {selectedYears.second || (
                <Icon name="plus" size="small" color="white" />
              )}
            </Button>
          </PopoverTrigger>
        </div>
      </div>
      {showMonths && (
        <div className="controls__date">
          Месяц:
          <div className="controls__buttons">
            <PopoverTrigger
              ref={triggerRef}
              content={
                <Calendar
                  view="year"
                  onSelect={(month: string) => handleSelectFirstMonth(month)}
                />
              }
            >
              <Button color="secondary" size="small">
                {formattedMonths.first}
                <Icon name="arrow_down" size="small" color="white" />
              </Button>
            </PopoverTrigger>
            -
            <PopoverTrigger
              ref={triggerRef}
              content={
                <Calendar
                  view="year"
                  onSelect={(month: string) => handleSelectSecondMonth(month)}
                />
              }
            >
              <Button color="secondary" size="small">
                {formattedMonths.second || (
                  <Icon name="plus" size="small" color="white" />
                )}
              </Button>
            </PopoverTrigger>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateControls;
