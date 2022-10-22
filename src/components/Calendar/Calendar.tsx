import React, { useState } from 'react';
import { getDaysInMonth, format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale';

import './Calendar.scss';
import { monthsList } from './calendarData';

const Calendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(2022);
  const [currentView, setCurrentView] = useState('month');

  const month = format(new Date(selectedYear, selectedMonth), 'LLLL, yyyy', {locale: ru});
  const monthStart = format(new Date(selectedYear, selectedMonth), 'i');
  const monthLength: number = getDaysInMonth(new Date(month));

  const handleMonthCLick = (month: { id: number, shortName: string, name: string, num: number }) => {
    setSelectedMonth(month.id);
    setCurrentView('month');
  };

  const renderMonthView = () => {
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

    return (
      <div className='calendar__view'>
        <button className='calendar__button' onClick={() => setCurrentView('year')}>
          {month[0].toUpperCase() + month.slice(1)}
        </button>
        <ul className='calendar__list calendar__list_month'>
          <li className='calendar__weekday'>п</li>
          <li className='calendar__weekday'>в</li>
          <li className='calendar__weekday'>с</li>
          <li className='calendar__weekday'>ч</li>
          <li className='calendar__weekday'>п</li>
          <li className='calendar__weekday'>с</li>
          <li className='calendar__weekday'>в</li>
          {renderDays()}
        </ul>
      </div>
    )
  };

  const renderYearView = () => {
    return (
      <div className='calendar__view'>
        <button className='calendar__button' onClick={() => setCurrentView('decade')}>
          {selectedYear}
        </button>
        <ul className='calendar__list calendar__list_year'>
          {
            monthsList.map((month) => <li
                className='calendar__month'
                key={month.id}
                onClick={() => handleMonthCLick(month)}
              >{month.shortName}</li>)
          }
        </ul>
      </div>
    )
  }

  return (
    <div className='calendar'>
      {currentView === 'month' ? renderMonthView() : renderYearView() }
    </div>
  );
}

export default Calendar;