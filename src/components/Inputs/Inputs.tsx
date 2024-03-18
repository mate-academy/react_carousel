import React from 'react';
import './Inputs.scss';
import { InputProps } from '../../types/Setting';

const Inputs: React.FC<InputProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  setChange,
}) => (
  <div className="container">
    <label htmlFor="itemId">Item Width:</label>
    <input
      type="number"
      id="itemId"
      name="itemWidth"
      min="0"
      value={itemWidth}
      onChange={setChange}
    />

    <label htmlFor="frameId">Frame Size:</label>
    <input
      type="number"
      id="frameId"
      name="frameSize"
      min="1"
      max={images.length}
      value={frameSize}
      onChange={setChange}
    />

    <label htmlFor="stepId">Step:</label>
    <input
      type="number"
      id="stepId"
      name="step"
      min="0"
      max={images.length}
      value={step}
      onChange={setChange}
    />

    <label htmlFor="animationDuration">Animation Duration:</label>
    <input
      type="number"
      id="animationDuration"
      name="animationDuration"
      min="0"
      step="100"
      value={animationDuration}
      onChange={setChange}
    />
  </div>
);

export default Inputs;
