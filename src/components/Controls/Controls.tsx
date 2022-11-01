import React from 'react';

import './Controls.scss';
import DateControls from './DateControls';

const Controls: React.FC = () => {
  return (
    <section className="controls">
      <DateControls />
    </section>
  );
};

export default Controls;
