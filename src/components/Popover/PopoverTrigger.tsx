import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import Popover from './Popover';

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
}

interface Ref {
  root: HTMLElement | null;
  open: () => void;
  close: () => void;
}

const PopoverTrigger = forwardRef<Ref, Props>(({ children, content }, ref) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const triggerEl = triggerRef.current;

  const popoverRef = useRef<HTMLDivElement>(null);

  function handleClickTrigger(event: React.MouseEvent) {
    if (!popoverRef.current?.contains(event.target as Node))
      setIsPopoverOpen(!isPopoverOpen);
  }

  useImperativeHandle(ref, () => ({
    get root() {
      return triggerRef.current;
    },
    open: () => setIsPopoverOpen(true),
    close: () => setIsPopoverOpen(false),
  }));

  function handleClickOutsidePopover({ target }: MouseEvent) {
    if (!triggerEl?.contains(target as Node)) {
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
      <div
        className="trigger"
        ref={triggerRef}
        onClick={(e) => handleClickTrigger(e)}
      >
        {children}
        <Popover
          isOpen={isPopoverOpen}
          ref={popoverRef}
          triggerHeight={triggerEl?.clientHeight}
        >
          {content}
        </Popover>
      </div>
    </>
  );
});

export default PopoverTrigger;
