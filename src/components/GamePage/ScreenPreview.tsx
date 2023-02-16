import React, { useRef, useState } from 'react';
import { Screenshot } from '../../types/rawgApiTypes';
import { loadImageAsync, setOffParallax, setOnParallax } from '../../utils';
import Placeholder from '../Placeholder/Placeholder';

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
  const [screenLink, setScreenLink] = useState('');

  loadImageAsync(screen.image).then((url) => setScreenLink(url));

  return (
    <>
      {screenLink ? (
        <img
          key={screen.id}
          className={`gamepage__screenshot-preview ${
            isSelected ? 'gamepage__screenshot-preview_selected' : ''
          }`}
          src={screenLink}
          alt="screenshot"
          width={275}
          height={160}
          ref={previewRef}
          onClick={() => onSelectScreen(screen.image)}
          onMouseMove={(evt) => previewRect && setOnParallax(evt, previewRect)}
          onMouseLeave={() => previewRect && setOffParallax(previewRect)}
        />
      ) : (
        <Placeholder.Rect height="160px" styles={{ borderRadius: '10px' }} />
      )}
    </>
  );
};

export default ScreenPreview;
