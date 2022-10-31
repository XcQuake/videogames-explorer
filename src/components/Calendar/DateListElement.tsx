import React from 'react';

interface Props {
  value: string;
  onClick: () => void;
  style?: {
    [key: string]: string;
  };
}

const DateListElement: React.FC<Props> = ({ value, onClick, style }) => {
  return (
    <li className="calendar__month" style={style} onClick={() => onClick()}>
      {value}
    </li>
  );
};

export default DateListElement;
