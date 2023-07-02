import React from 'react';

import './Settings.scss';

interface Props {
  itemWidth: number,
  setItemWidth: (value: number) => void,
  IMAGE_COUNT: number,
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
  IMAGE_COUNT,
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
        type="number"
        value={itemWidth}
        min={100}
        max={300}
        step={10}
        onChange={(event) => setItemWidth(+event.target.value)}
        placeholder="itemWidth"
        name="itemWidth"
      />
    </div>

    <div className="Settings__row">
      <label className="Settings__label" htmlFor="frameSize">
        Images count:
      </label>

      <input
        className="Settings__field"
        type="number"
        min={1}
        max={Math.floor(IMAGE_COUNT / 2)}
        value={frameSize}
        onChange={(event) => setFrameSize(+event.target.value)}
        placeholder="frameSize"
        name="frameSize"
      />
    </div>

    <div className="Settings__row">
      <label className="Settings__label" htmlFor="step">
        Step size:
      </label>

      <input
        className="Settings__field"
        type="number"
        value={step}
        min={1}
        max={IMAGE_COUNT}
        onChange={(event) => setStep(+event.target.value)}
        placeholder="step"
        name="step"
      />
    </div>

    <div className="Settings__row">
      <label className="Settings__label" htmlFor="animationDuration">
        Animation duration:
      </label>

      <input
        className="Settings__field"
        type="number"
        min={500}
        max={5000}
        step={500}
        value={animationDuration}
        onChange={(event) => setAnimationDuration(+event.target.value)}
        placeholder="animationDuration"
        name="animationDuration"
      />
    </div>
  </div>
);
