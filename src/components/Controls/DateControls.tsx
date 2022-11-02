import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Calendar from '../Calendar/Calendar';
import PopoverTrigger from '../Popover/PopoverTrigger';

interface Ref {
  root: HTMLElement | null;
  open: () => void;
  close: () => void;
}

const DateControls: React.FC = () => {
  const [showMonths, setShowMonths] = useState<boolean>(false);
  const [selectedYears, setSelectedYears] = useState<number[]>([2022]);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);

  const triggerRef = useRef<Ref>() as React.MutableRefObject<Ref>;

  const selectedMonthsName = {
    first:
      selectedMonths[0] &&
      format(new Date(`${selectedYears[0]}-${selectedMonths[0]}-01`), 'LLLL', {
        locale: ru,
      }),
    second:
      selectedMonths[1] &&
      format(new Date(`${selectedYears[0]}-${selectedMonths[1]}-01`), 'LLLL', {
        locale: ru,
      }),
  };

  const handleSelectFirstYear = (year: number) => {
    setSelectedYears([year]);
    triggerRef.current.close();
  };

  const handleSelectSecondYear = (year: number) => {
    if (year === selectedYears[0]) return;
    setSelectedYears([selectedYears[0], year].sort((x, y) => x - y));
    triggerRef.current.close();
  };

  const handleSelectFirstMonth = (month: number) => {
    setSelectedMonths([month]);
    triggerRef.current.close();
  };

  const handleSelectSecondMonth = (month: number) => {
    if (month === selectedMonths[0]) return;
    setSelectedMonths([selectedMonths[0], month].sort((x, y) => x - y));
    triggerRef.current.close();
  };

  useEffect(() => {
    if (selectedYears.length < 2) {
      setShowMonths(true);
      setSelectedMonths([1, 12]);
    } else {
      setSelectedMonths([]);
      setShowMonths(false);
    }
  }, [selectedYears]);

  return (
    <div className="controls__dates">
      <div className="controls__year">
        Год:
        <div className="controls__buttons">
          <PopoverTrigger
            ref={triggerRef}
            content={
              <Calendar
                view="decade"
                onSelect={(year: number) => handleSelectFirstYear(year)}
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
                onSelect={(year: number) => handleSelectSecondYear(year)}
              />
            }
          >
            <Button color="secondary" size="small">
              {selectedYears[1] ? (
                <>{selectedYears[1]} </>
              ) : (
                <Icon name="plus" size="small" color="white" />
              )}
            </Button>
          </PopoverTrigger>
        </div>
      </div>
      {showMonths && (
        <div className="controls__year">
          Месяц:
          <div className="controls__buttons">
            <PopoverTrigger
              ref={triggerRef}
              content={
                <Calendar
                  view="year"
                  onSelect={(month: number) => handleSelectFirstMonth(month)}
                />
              }
            >
              <Button color="secondary" size="small">
                {selectedMonthsName.first}
                <Icon name="arrow_down" size="small" color="white" />
              </Button>
            </PopoverTrigger>
            -
            <PopoverTrigger
              ref={triggerRef}
              content={
                <Calendar
                  view="year"
                  onSelect={(month: number) => handleSelectSecondMonth(month)}
                />
              }
            >
              <Button color="secondary" size="small">
                {selectedMonths[1] ? (
                  <>{selectedMonthsName.second} </>
                ) : (
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
