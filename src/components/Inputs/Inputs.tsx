import React from 'react';
import './Inputs.scss';

type Props = {
  setWidth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemWidth: number;
  setFrameSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
  frameSize: number;
  setStep: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step: number;
  setAnimationDuration: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getInfinity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  animationDuration: number;
};

const Inputs: React.FC<Props> = ({
  setWidth,
  itemWidth,
  setFrameSize,
  frameSize,
  setStep,
  step,
  setAnimationDuration,
  animationDuration,
  getInfinity,
}) => {
  return (
    <div className="inputs">
      <label htmlFor="width">Item Width</label>
      <input
        type="number"
        value={itemWidth}
        id="width"
        name="itemWidth"
        className="input"
        onChange={setWidth}
      />
      <label htmlFor="size">Frame Size</label>
      <input
        type="number"
        value={frameSize}
        id="size"
        name="frameSize"
        className="input"
        onChange={setFrameSize}
      />
      <label htmlFor="step">Step</label>
      <input
        type="number"
        value={step}
        id="step"
        name="step"
        className="input"
        onChange={setStep}
      />
      <label htmlFor="duration">Animation Duration</label>
      <input
        type="number"
        value={animationDuration}
        id="duration"
        name="animationDuration"
        className="input"
        onChange={setAnimationDuration}
      />
      <label htmlFor="infinity">Infinity</label>
      <input
        type="checkbox"
        id="infinity"
        name="infinity"
        className="input"
        onChange={getInfinity}
      />
    </div>
  );
};

export default Inputs;
