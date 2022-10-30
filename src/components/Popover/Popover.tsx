import React, { forwardRef } from 'react';

import './Popover.scss';

interface Props {
  isOpen: boolean;
  triggerPos: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  content: React.ReactNode;
}
type Ref = HTMLDivElement;

const Popover = forwardRef<Ref, Props>(
  ({ isOpen, triggerPos, content }, ref) => {
    return (
      <div
        ref={ref}
        className={`popover ${isOpen ? 'open' : ''}`}
        style={{ top: triggerPos.bottom + 10, left: triggerPos.left }}
      >
        {content}
      </div>
    );
  }
);

export default Popover;
