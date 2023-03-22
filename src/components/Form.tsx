import React from 'react';
import './Form.scss';

export const INITIAL_ITEM_WIDTH = 130;

type Props = {
  itemWidth: number;
  onChangeWidth: (event: React.ChangeEvent<HTMLInputElement>) => void;
  step: number;
  onStepChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  frameSize: number;
  onFrameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  animationDuration: number;
  onDurationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInfiniteChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imagesLength: number;
};

export const Form: React.FC<Props> = ({
  itemWidth,
  onChangeWidth,
  step,
  onStepChange,
  frameSize,
  onFrameChange,
  animationDuration,
  onDurationChange,
  onInfiniteChange,
  imagesLength,
}) => {
  return (
    <div className="Form">
      <label className="Form__label">
        Image size:
        <input
          className="Form__input"
          type="number"
          step="10"
          min={INITIAL_ITEM_WIDTH}
          value={itemWidth}
          onChange={onChangeWidth}
        />
      </label>

      <label className="Form__label">
        Step:
        <input
          className="Form__input"
          type="number"
          min="1"
          max="5"
          value={step}
          onChange={onStepChange}
        />
      </label>

      <label className="Form__label">
        How many images are seen:
        <input
          className="Form__input"
          type="number"
          min="1"
          max={imagesLength}
          value={frameSize}
          onChange={onFrameChange}
        />
      </label>

      <label className="Form__label">
        Duration of animation:
        <input
          className="Form__input"
          type="number"
          min="0"
          max="10000"
          step="100"
          value={animationDuration}
          onChange={onDurationChange}
        />
      </label>

      <label className="Form__label">
        Infinite:
        <input
          className="Form__input"
          type="checkbox"
          onChange={onInfiniteChange}
        />
      </label>
    </div>
  );
};
