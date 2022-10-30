import React, { useEffect, useRef, useState } from 'react';
import Popover from './Popover';

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
}

const PopoverTrigger: React.FC<Props> = ({ children, content }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [triggerPosition, setTriggerPosition] = useState({
    left: -1000,
    top: -1000,
    right: -1000,
    bottom: -1000,
  });
  const triggerRef = useRef<HTMLDivElement>(null);
  const triggerEl = triggerRef.current;

  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverEl = popoverRef.current;

  function handleClickTrigger() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  useEffect(() => {
    if (triggerEl) {
      const triggerRect = triggerEl.getBoundingClientRect();
      setTriggerPosition({
        left: triggerRect.left,
        top: triggerRect.top,
        right: triggerRect.right,
        bottom: triggerRect.bottom,
      });
    }
  }, [triggerEl]);

  function handleClickOutsidePopover({ target }: MouseEvent) {
    if (
      !triggerEl?.contains(target as Node) &&
      !popoverEl?.contains(target as Node)
    ) {
      setIsPopoverOpen(false);
    }
  }

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener('click', handleClickOutsidePopover);
    }
    return () =>
      document.removeEventListener('click', handleClickOutsidePopover);
  }, [isPopoverOpen]);

  return (
    <>
      <div ref={triggerRef} onClick={() => handleClickTrigger()}>
        {children}
      </div>
      <Popover
        isOpen={isPopoverOpen}
        triggerPos={triggerPosition}
        ref={popoverRef}
        content={content}
      />
    </>
  );
};

export default PopoverTrigger;
