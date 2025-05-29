import React from 'react';

interface Props {
  itemWidth: number;
  setItemWidth: (value: number) => void;
  frameSize: number;
  setFrameSize: (value: number) => void;
  step: number;
  setStep: (value: number) => void;
  animationDuration: number;
  setAnimationDuration: (value: number) => void;
}

export const Header: React.FC<Props> = ({
  itemWidth,
  setItemWidth,
  frameSize,
  setFrameSize,
  step,
  setStep,
  animationDuration,
  setAnimationDuration,
}) => {
  return (
    <div className="is-flex is-flex-direction-row is-gap-4">
      <div
        className="is-flex is-flex-direction-column
            is-align-items-center"
      >
        <label className="label" htmlFor="itemId">
          Image Size
        </label>
        <input
          id="itemId"
          className="input is-primary"
          type="number"
          placeholder="130px"
          value={itemWidth}
          onChange={e => setItemWidth(+e.target.value)}
        />
      </div>
      <div
        className="is-flex is-flex-direction-column
            is-align-items-center"
      >
        <label className="label" htmlFor="frameId">
          Number of images
        </label>
        <input
          id="frameId"
          className="input is-primary"
          type="number"
          placeholder="3"
          value={frameSize}
          onChange={e => setFrameSize(+e.target.value)}
        />
      </div>
      <div
        className="is-flex is-flex-direction-column
            is-align-items-center"
      >
        <label className="label" htmlFor="stepId">
          Step
        </label>
        <input
          id="stepId"
          className="input is-primary"
          type="number"
          placeholder="3"
          value={step}
          onChange={e => setStep(+e.target.value)}
        />
      </div>
      <div
        className="is-flex is-flex-direction-column
            is-align-items-center"
      >
        <label className="label" htmlFor="animationDuration">
          Animation
        </label>
        <input
          id="animationDuration"
          className="input is-primary"
          type="number"
          placeholder="1000"
          value={animationDuration}
          onChange={e => setAnimationDuration(+e.target.value)}
        />
      </div>
    </div>
  );
};
