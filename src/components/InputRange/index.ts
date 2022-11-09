import React from 'react';

export function getPercentageFromValue(
  minValue: number,
  maxValue: number,
  value: number
) {
  const validValue = Math.min(Math.max(minValue, value), maxValue);
  const difference = maxValue - minValue;
  const percentage = ((validValue - minValue) / difference) * 100;

  return percentage || 0;
}

export function getPercentagesFromValues(
  minValue: number,
  maxValue: number,
  values: { min: number; max: number }
) {
  return {
    min: getPercentageFromValue(minValue, maxValue, values.min),
    max: getPercentageFromValue(minValue, maxValue, values.max),
  };
}

export function getPositionFromValue(
  value: number,
  minValue: number,
  maxValue: number,
  clientRect: DOMRect
) {
  const length = clientRect.width;
  const valuePerc = getPercentageFromValue(value, minValue, maxValue);
  return valuePerc * length;
}

export function getPositionOnClick(
  event: React.MouseEvent,
  clientRect: DOMRect
) {
  const length = clientRect.width;
  const clientX = event.clientX;

  return Math.min(Math.max(clientX - clientRect.left, 0), length);
}

export function getPercentageFromPosition(
  position: number,
  clientRect: DOMRect
) {
  const length = clientRect.width;
  return position / length || 0;
}

export function getValueFromPosition(
  position: number,
  maxValue: number,
  minValue: number,
  clientRect: DOMRect
) {
  const posPercentage = getPercentageFromPosition(position, clientRect);
  const difference = maxValue - minValue;
  return Math.floor(posPercentage * difference + minValue);
}

export function getClosestKeyToNewValue(
  values: { min: number; max: number },
  newValue: number
) {
  return Math.abs(newValue - values.min) > Math.abs(newValue - values.max)
    ? 'max'
    : 'min';
}
