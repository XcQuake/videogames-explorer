import React from 'react';

import './Controls.scss';
import DateControls from './DatesControls';

const Controls: React.FC = () => {
  return (
    <section className="controls">
      <DateControls />
    </section>
  );
};

export default Controls;
