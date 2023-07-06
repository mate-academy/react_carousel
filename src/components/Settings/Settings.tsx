import React from 'react';

import './Settings.scss';

interface Props {
  itemWidth: number,
  setItemWidth: (value: number) => void,
  imageCount: number,
  frameSize: number,
  setFrameSize: (value: number) => void,
  step: number,
  setStep: (value: number) => void,
  animationDuration: number,
  setAnimationDuration: (value: number) => void,
}

export const Settings: React.FC<Props> = ({
  itemWidth,
  setItemWidth,
  imageCount,
  frameSize,
  setFrameSize,
  step,
  setStep,
  animationDuration,
  setAnimationDuration,
}) => (
  <div className="Settings">
    <div className="Settings__row">
      <label className="Settings__label" htmlFor="itemWidth">
        Image width:
      </label>

      <input
        className="Settings__field"
        type="range"
        value={itemWidth}
        min={100}
        max={300}
        onChange={(event) => setItemWidth(+event.target.value)}
        name="itemWidth"
      />

      <span className="Settings__currentValue">{itemWidth}</span>
    </div>

    <div className="Settings__row">
      <label className="Settings__label" htmlFor="frameSize">
        Images count:
      </label>

      <input
        className="Settings__field"
        type="range"
        min={1}
        max={Math.floor(imageCount / 2)}
        value={frameSize}
        onChange={(event) => setFrameSize(+event.target.value)}
        name="frameSize"
      />

      <span className="Settings__currentValue">{frameSize}</span>
    </div>

    <div className="Settings__row">
      <label className="Settings__label" htmlFor="step">
        Step size:
      </label>

      <input
        className="Settings__field"
        type="range"
        value={step}
        min={1}
        max={imageCount}
        onChange={(event) => setStep(+event.target.value)}
        name="step"
      />

      <span className="Settings__currentValue">{step}</span>
    </div>

    <div className="Settings__row">
      <label className="Settings__label" htmlFor="animationDuration">
        Animation duration:
      </label>

      <input
        className="Settings__field"
        type="range"
        min={500}
        max={5000}
        value={animationDuration}
        onChange={(event) => setAnimationDuration(+event.target.value)}
        name="animationDuration"
      />

      <span className="Settings__currentValue">{animationDuration}</span>
    </div>
  </div>
);
