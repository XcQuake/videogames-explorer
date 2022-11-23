import React, { useRef } from 'react';
import { Screenshot } from '../../types/rawgApiTypes';

interface Props {
  screen: Screenshot;
  onSelectScreen: (arg0: string) => void;
}

const ScreenPreview: React.FC<Props> = ({ screen, onSelectScreen }) => {
  const previewRef = useRef<HTMLImageElement>(null);
  const previewRect = previewRef.current;

  function handleOnParallax(evt: React.MouseEvent) {
    if (!previewRect) return;
    previewRect.style.transform = `perspective(2000px) rotatey(${
      (evt.nativeEvent.offsetX - previewRect.offsetWidth / 2) / 8
    }deg) rotatex(${
      ((evt.nativeEvent.offsetY - previewRect.offsetHeight / 2) / 8) * -1
    }deg) scale(1.05)`;
  }

  function handleOffParallax() {
    if (!previewRect) return;
    previewRect.style.transform = ``;
  }

  return (
    <div
      onMouseMove={(evt) => handleOnParallax(evt)}
      onMouseLeave={() => handleOffParallax()}
    >
      <img
        key={screen.id}
        className="gamepage__screenshot-preview"
        src={screen.image}
        alt="screenshot"
        width={275}
        height={160}
        ref={previewRef}
        onClick={() => onSelectScreen(screen.image)}
      />
    </div>
  );
};

export default ScreenPreview;
