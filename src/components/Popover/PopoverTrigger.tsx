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
    if (!triggerEl) return;
    const triggerRect = triggerEl.getBoundingClientRect();
    setTriggerPosition({
      left: triggerRect.left,
      top: triggerRect.top,
      right: triggerRect.right,
      bottom: triggerRect.bottom,
    });
  }, [triggerEl]);

  useImperativeHandle(ref, () => ({
    get root() {
      return triggerRef.current;
    },
    open: () => handleOpen(),
    close: () => handleClose(),
  }));

  function handleOpen() {
    setIsPopoverOpen(true);
  }

  function handleClose() {
    setIsPopoverOpen(false);
  }

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
});

export default PopoverTrigger;
