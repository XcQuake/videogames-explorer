import React from 'react';
import { getDaysInMonth, format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale';

import './Calendar.scss';

const Calendar: React.FC = () => {
  const month = format(new Date(), 'LLLL, yyyy', {locale: ru});
  const monthStart = format(new Date(month), 'i');
  const monthLength: number = getDaysInMonth(new Date(month));
  const monthsList = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

  const renderDays = () => {
    const days = [];
    for (let i = 1; i<=monthLength; i++) {
      days.push(
        <li
          className='calendar__day'
          key={`day${i}`}
          style={{
            gridColumnStart: i === 1 ? monthStart : 'auto'
          }}
        >{i}</li>
      )
    };
    return days;
  };

  const renderMonths = (
    monthsList.map((month, index) => <li className='calendar__month' key={index}>{month}</li>)
  )

  return (
    <div className='calendar'>
      <button className='calendar__button'>{month[0].toUpperCase() + month.slice(1)}</button>
      <ul className='calendar__list calendar__list_month'>
        {renderDays()}
      </ul>
      <ul className='calendar__list calendar__list_year'>
        {renderMonths}
      </ul>
    </div>
  );
}

export default Calendar;