import React, { useState, useRef } from 'react';
import {
  getClosestKeyToNewValue,
  getPercentagesFromValues,
  getPositionOnClick,
  getValueFromPosition,
} from '.';

import './InputRange.scss';

interface Props {
  minValue: number;
  maxValue: number;
  step: number;
  defValues: {
    min: number;
    max: number;
  };
}

const InputRange: React.FC<Props> = ({
  minValue,
  maxValue,
  step,
  defValues,
}) => {
  const [values, setValues] = useState({
    min: defValues.min,
    max: defValues.max,
  });
  const percentages = getPercentagesFromValues(minValue, maxValue, values);

  const trackRef = useRef<HTMLDivElement>(null);

  function getTrackRect() {
    return trackRef.current!.getClientRects()[0];
  }

  function handleMouseDown(event: React.MouseEvent) {
    const trackRect = getTrackRect();
    const position = getPositionOnClick(event, trackRect);
    const newValue = getValueFromPosition(
      position,
      maxValue,
      minValue,
      trackRect
    );
    const key = getClosestKeyToNewValue(values, newValue);
    setValues({
      ...values,
      [key]: newValue,
    });
  }

  return (
    <div className="input-range">
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleDrag}
        className="input-range__track"
      >
        <div
          className="input-range__thumb"
          style={{ left: `${percentages.min}%` }}
        >
          <span className="input-range__label">{values.min}</span>
        </div>
        <div
          className="input-range__track input-range__track_active"
          style={{
            left: `${percentages.min}%`,
            width: `${percentages.max - percentages.min}%`,
          }}
        />
        <div
          className="input-range__thumb"
          style={{ left: `${percentages.max}%` }}
        >
          <span className="input-range__label">{values.max}</span>
        </div>
      </div>
    </div>
  );
};

export default InputRange;
