import React, { useEffect, useRef, useState } from 'react';
import { compareAsc, format } from 'date-fns';
import { ru } from 'date-fns/locale';

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
  const [selectedYears, setSelectedYears] = useState<string[]>(['2023']);
  const [selectedMonths, setSelectedMonths] = useState<string[]>(['01', '12']);

  const dispatch = useAppDispatch();
  const triggerRef = useRef<Ref>() as React.MutableRefObject<Ref>;
  const formattedMonths = formatMonths(selectedMonths[0], selectedMonths[1]);

  const handleSelectFirstYear = (year: string) => {
    setSelectedYears([year]);
    triggerRef.current.close();
  };

  const handleSelectSecondYear = (year: string) => {
    if (year === selectedYears[0]) return;
    setSelectedYears(
      [selectedYears[0], year].sort((x, y) =>
        compareAsc(new Date(x), new Date(y))
      )
    );
    triggerRef.current.close();
  };

  const handleSelectFirstMonth = (month: string) => {
    setSelectedMonths([month]);
    triggerRef.current.close();
  };

  const handleSelectSecondMonth = (month: string) => {
    if (month === selectedMonths[0]) return;
    setSelectedMonths(
      [selectedMonths[0], month].sort((x, y) =>
        compareAsc(new Date(x), new Date(y))
      )
    );
    triggerRef.current.close();
  };

  useEffect(() => {
    if (selectedYears.length < 2) {
      setShowMonths(true);
      setSelectedMonths(['01', '12']);
    } else {
      setSelectedMonths([]);
      setShowMonths(false);
    }
  }, [selectedYears]);

  useEffect(() => {
    if (selectedYears.length === 2) {
      dispatch(
        setReleaseDates(`${selectedYears[0]}-01-01,${selectedYears[1]}-12-31`)
      );
    } else {
      dispatch(
        setReleaseDates(
          `${selectedYears[0]}-${selectedMonths[0]}-01,${selectedYears[0]}-${
            selectedMonths[1] || selectedMonths[0]
          }-30`
        )
      );
    }
  }, [selectedYears, selectedMonths]);

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
              {selectedYears[0]}
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
              {selectedYears[1] || (
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
