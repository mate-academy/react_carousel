import React from 'react';

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
    <div className="App__form">
      <label className="App__label">
        Image size:
        <input
          className="App__input"
          type="number"
          step="10"
          min={INITIAL_ITEM_WIDTH}
          value={itemWidth}
          onChange={onChangeWidth}
        />
      </label>

      <label className="App__label">
        Step:
        <input
          className="App__input"
          type="number"
          min="1"
          max="5"
          value={step}
          onChange={onStepChange}
        />
      </label>

      <label className="App__label">
        How many images are seen:
        <input
          className="App__input"
          type="number"
          min="1"
          max={imagesLength}
          value={frameSize}
          onChange={onFrameChange}
        />
      </label>

      <label className="App__label">
        Duration of animation:
        <input
          className="App__input"
          type="number"
          min="0"
          max="10000"
          step="100"
          value={animationDuration}
          onChange={onDurationChange}
        />
      </label>

      <label className="App__label">
        Infinite:
        <input
          className="App__input"
          type="checkbox"
          onChange={onInfiniteChange}
        />
      </label>
    </div>
  );
};
