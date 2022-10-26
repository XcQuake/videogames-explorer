import React, { useState } from 'react';
import { compareAsc } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hoos';
import { setRangeValue, setRange } from '../../state/calendarState';

interface Props {
  stringDate: string;
  inRangeDateStyle: {
    [key: string]: string;
  };
  pickedDateStyle: {
    [key: string]: string;
  };
  previewStyle: {
    [key: string]: string;
  };
  isPreviewShown: boolean;
  type: 'month' | 'year';
  onClick: () => void;
  onMouseEnter: () => void;
  hoverDateOnPreview: Date | null;
}

const DateListElement: React.FC<Props> = ({
  stringDate,
  isPreviewShown,
  onClick,
  onMouseEnter,
  type,
  hoverDateOnPreview,
}) => {
  const { range } = useAppSelector((state) => state.calendar);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const fullDate = new Date(stringDate);
  const day = fullDate.getDay();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();

  const renderValue = () => {
    switch (type) {
      case 'month':
        return month;
      case 'year':
        return year;
    }
  };

  const rangeDates = {
    early: new Date(range[0]),
    late: new Date(range[1]),
  };

  // Выбрана ли эта дата
  const isPickedDay =
    (range[0] === stringDate && !compareAsc(fullDate, rangeDates.early)) ||
    (range[1] === stringDate && !compareAsc(fullDate, rangeDates.late));

  // Находится ли эта в диапозоне выбранных дат
  const inRange =
    !isPreviewShown &&
    compareAsc(fullDate, rangeDates.early) > 0 &&
    compareAsc(fullDate, rangeDates.late) < 0;

  // Находится ли эта дата в диапозоне между первой выбранной датой и датой, на которую наведена мышь
  const isEarlierThanFirstDay =
    hoverDateOnPreview &&
    compareAsc(rangeDates.early, hoverDateOnPreview) > 0 &&
    compareAsc(fullDate, hoverDateOnPreview) > 0 &&
    compareAsc(fullDate, rangeDates.early) < 0;

  const isLaterThanFirstDay =
    hoverDateOnPreview &&
    compareAsc(rangeDates.early, hoverDateOnPreview) < 0 &&
    compareAsc(fullDate, hoverDateOnPreview) < 0 &&
    compareAsc(fullDate, rangeDates.early) > 0;

  const inPreview = isEarlierThanFirstDay || isLaterThanFirstDay;

  return (
    <li
      className="calendar__month"
      key={stringDate}
      style={{
        backgroundColor: isPickedDay
          ? '#6B69F9'
          : inRange || inPreview
          ? '#6b69f946'
          : 'inherit',
      }}
      onClick={() => onClick()}
      onMouseEnter={() => onMouseEnter()}
    >
      {renderValue()}
    </li>
  );
};

export default DateListElement;
