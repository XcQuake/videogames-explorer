import React, { useRef, useEffect, useState } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { BREAKPOINTS } from '../../utils/contants';

interface Props {
  children: React.ReactNode;
  gapSpan: number;
}

const GridElement: React.FC<Props> = ({ children, gapSpan }) => {
  const [spansCount, setSpansCount] = useState(2);
  let ref = useRef<HTMLDivElement>(null);
  const elementHeight = ref.current && ref.current.children[0].clientHeight;
  const { windowWidth } = useWindowWidth();

  const divider = windowWidth <= BREAKPOINTS.mobile ? 10.5 : 10;

  useEffect(() => {
    const setSpans = () => {
      const elementHeight = ref.current && ref.current.children[0].clientHeight;
      if (!elementHeight) return;
      setSpansCount(Math.ceil(elementHeight / divider) + gapSpan);
    };

    if (ref.current) setSpans();
  }, [divider, gapSpan, elementHeight]);

  return (
    <div ref={ref} style={{ gridRowEnd: `span ${spansCount}` }}>
      {children}
    </div>
  );
};

export default GridElement;
