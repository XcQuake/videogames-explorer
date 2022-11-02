import React from 'react';

import './Controls.scss';
import DateControls from './DateControls';

const Controls: React.FC = () => {
  return (
    <div className="controls">
      <DateControls />
    </div>
  );
};

export default Controls;
