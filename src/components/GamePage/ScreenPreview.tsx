import React, { useRef } from 'react';
import { Screenshot } from '../../types/rawgApiTypes';
import { setOffParallax, setOnParallax } from '../../utils';

interface Props {
  screen: Screenshot;
  onSelectScreen: (arg0: string) => void;
  isSelected: boolean;
}

const ScreenPreview: React.FC<Props> = ({
  screen,
  onSelectScreen,
  isSelected,
}) => {
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
      onMouseMove={(evt) => previewRect && setOnParallax(evt, previewRect)}
      onMouseLeave={() => previewRect && setOffParallax(previewRect)}
    >
      <img
        key={screen.id}
        className={`gamepage__screenshot-preview ${
          isSelected ? 'gamepage__screenshot-preview_selected' : ''
        }`}
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
