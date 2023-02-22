import { useState, useEffect } from 'react';

export const useWindowWidth = (): { windowWidth: number } => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResizeWindow = (): void => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return {
    windowWidth,
  };
};
