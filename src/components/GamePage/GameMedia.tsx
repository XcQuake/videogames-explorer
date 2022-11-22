import React, { useState } from 'react';
import { Screenshots } from '../../types/rawgApiTypes';

interface Props {
  screenshots: Screenshots[];
}

const GameMedia: React.FC<Props> = ({ screenshots }) => {
  const [selectedScreen, setSelectedScreen] = useState(screenshots[0].image);

  return (
    <div className="gamepage__media">
      <img className="gamepage__screenshot" src={selectedScreen} alt="screen" />
      <div className="gamepage__screenshot-list">
        {screenshots.map((screen, i) => {
          return (
            <img
              className="gamepage__screenshot-preview"
              src={screen.image}
              alt="screenshot"
              onClick={() => setSelectedScreen(screen.image)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameMedia;
