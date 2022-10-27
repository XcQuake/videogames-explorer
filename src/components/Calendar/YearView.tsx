import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hoos';
import { setRangeValue } from '../../state/calendarState';
import DateListElement from './DateListElement';

const YearView: React.FC = () => {
  const { year } = useAppSelector((state) => state.calendar);
  const [isPreviewShown, setIsPreviewShown] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();

  const renderMonths = () => {
    function handleClick(stringDate: string) {
      if (!isPreviewShown) {
        setIsPreviewShown(true);
        dispatch(setRangeValue(stringDate));
      } else {
        dispatch(setRangeValue(stringDate));
        setIsPreviewShown(false);
      }
    }

    function handleMouseEnter(fullDate: Date) {
      isPreviewShown && setHoverDate(fullDate);
    }

    const months = [];
    for (let i = 1; i <= 12; i++) {
      const stringDate = `${year}-${i}-1`;
      const fullDate = new Date(stringDate);
      const value = format(fullDate, 'LLL', { locale: ru });
      months.push(
        <DateListElement
          key={`month${i}`}
          stringDate={stringDate}
          fullDate={fullDate}
          value={value}
          inRangeDateStyle={{ backgroundColor: '#6b69f946' }}
          pickedDateStyle={{ backgroundColor: '#6B69F9' }}
          previewStyle={{ backgroundColor: '#6b69f946' }}
          isPreviewShown={isPreviewShown}
          type="month"
          onClick={() => handleClick(stringDate)}
          onMouseEnter={() => handleMouseEnter(new Date(stringDate))}
          hoverDateOnPreview={hoverDate}
        />
      );
    }
    return months;
  };

  return (
    <div className="calendar__view">
      <ul className="calendar__list calendar__list_year">{renderMonths()}</ul>
    </div>
  );
};

export default YearView;
