import React from 'react';
import { InputChangeCallback } from '../../types/InputChangeCallback';

type Props = {
  imageCount: number;
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  isInfinite: boolean;
  handleItemWidthChange: InputChangeCallback;
  handleFrameSizeChange: InputChangeCallback;
  handleStepChange: InputChangeCallback;
  handleDurationChange: InputChangeCallback;
  handleInfiniteChange: InputChangeCallback;
};

export const Form: React.FC<Props> = (props) => {
  const {
    imageCount,
    itemWidth,
    frameSize,
    step,
    animationDuration,
    isInfinite,
    handleItemWidthChange,
    handleFrameSizeChange,
    handleStepChange,
    handleDurationChange,
    handleInfiniteChange,
  } = props;

  return (
    <form className="form">
      <label htmlFor="itemId" className="form__field">
        ItemWidth
        <input
          type="number"
          className="form__input"
          id="itemId"
          value={itemWidth}
          min={1}
          max={800}
          onChange={handleItemWidthChange}
        />
      </label>

      <label htmlFor="frameId" className="form__field">
        FrameSize
        <input
          type="number"
          className="form__input"
          id="frameId"
          value={frameSize}
          min={1}
          max={imageCount}
          onChange={handleFrameSizeChange}
        />
      </label>

      <label htmlFor="stepId" className="form__field">
        Step
        <input
          type="number"
          className="form__input"
          id="stepId"
          value={step}
          min={1}
          max={imageCount}
          onChange={handleStepChange}
        />
      </label>

      <label htmlFor="DurationId" className="form__field">
        Duration
        <input
          type="number"
          className="form__input"
          id="DurationId"
          value={animationDuration}
          min={50}
          onChange={handleDurationChange}
        />
      </label>

      <label htmlFor="InfiniteId" className="form__field">
        Is infinite?
        <input
          type="checkbox"
          className="form__input"
          id="InfiniteId"
          checked={isInfinite}
          onChange={handleInfiniteChange}
        />
      </label>
    </form>
  );
};
