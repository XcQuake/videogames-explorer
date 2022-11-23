import React, { useRef, useState } from 'react';
import { Screenshot } from '../../types/rawgApiTypes';
import ScreenPreview from './ScreenPreview';

interface Props {
  screenshots: Screenshot[];
}

const GameMedia: React.FC<Props> = ({ screenshots }) => {
  const [selectedScreen, setSelectedScreen] = useState(screenshots[0].image);

  return (
    <div className="gamepage__media">
      <img
        className="gamepage__screenshot"
        src={selectedScreen}
        alt="screen"
        width={1270}
        height={720}
      />
      <div className="gamepage__screenshot-list">
        {screenshots.map((screen) => {
          return (
            <ScreenPreview
              key={screen.id}
              screen={screen}
              onSelectScreen={(link) => setSelectedScreen(link)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameMedia;
