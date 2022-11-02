import React, { forwardRef } from 'react';

import './Popover.scss';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  triggerHeight: number | undefined;
}
type Ref = HTMLDivElement;

const Popover = forwardRef<Ref, Props>(
  ({ isOpen, children, triggerHeight }, ref) => {
    const renderContent = () => {
      if (isOpen) {
        return (
          <div
            ref={ref}
            style={{ top: triggerHeight && triggerHeight + 10 }}
            className="popover"
          >
            {children}
          </div>
        );
      } else {
        return <></>;
      }
    };

    return renderContent();
  }
);

export default Popover;
