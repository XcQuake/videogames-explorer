import React, { useRef, useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  gapSpan: number;
}

const GridElement: React.FC<Props> = ({ children, gapSpan }) => {
  const [spansCount, setSpansCount] = useState(2);
  let ref = useRef<HTMLDivElement>(null);

  const setSpans = () => {
    if (!ref.current?.children[0].clientHeight) return;
    const elementHeight = ref.current.children[0].clientHeight;
    setSpansCount(Math.ceil(elementHeight / 10) + gapSpan);
  };

  useEffect(() => {
    if (ref.current) setSpans();
  }, []);

  return (
    <div ref={ref} style={{ gridRowEnd: `span ${spansCount}` }}>
      {children}
    </div>
  );
};

export default GridElement;
