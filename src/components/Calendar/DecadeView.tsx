import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hoos';
import { setRangeValue } from '../../state/calendarState';
import DateListElement from './DateListElement';

const DecadeView: React.FC = () => {
  const { decadeStart } = useAppSelector((state) => state.calendar);
  const [isPreviewShown, setIsPreviewShown] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();

  const renderYears = () => {
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

    const years = [];
    for (let i = decadeStart; i < decadeStart + 10; i++) {
      const stringDate = `${i}-01-01`;
      const fullDate = new Date(stringDate);
      years.push(
        <DateListElement
          key={`year${i}`}
          stringDate={stringDate}
          fullDate={fullDate}
          value={fullDate.getFullYear().toString()}
          inRangeDateStyle={{ backgroundColor: '#6b69f946' }}
          pickedDateStyle={{ backgroundColor: '#6B69F9' }}
          previewStyle={{ backgroundColor: '#6b69f946' }}
          isPreviewShown={isPreviewShown}
          type="year"
          onClick={() => handleClick(stringDate)}
          onMouseEnter={() => handleMouseEnter(fullDate)}
          hoverDateOnPreview={hoverDate}
        />
      );
    }
    return years;
  };

  return (
    <div className="calendar__view">
      <ul className="calendar__list calendar__list_decade">{renderYears()}</ul>
    </div>
  );
};

export default DecadeView;
