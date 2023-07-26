import React, { ChangeEvent } from 'react';
import './Controls.scss';

type Props = {
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
  onTextImputChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onCheckInputChange: () => void,
};

export const Controls: React.FC<Props> = ({
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
  onTextImputChange,
  onCheckInputChange,
}) => {
  return (
    <div className="controls">
      <label className="App__input-label">
        {'Enter image width: '}
        <input
          type="number"
          min="65"
          max="1300"
          step="65"
          value={itemWidth}
          name="item width"
          onChange={onTextImputChange}
        />
      </label>

      <label className="App__input-label">
        {'Enter slider frame size: '}
        <input
          type="number"
          min="1"
          max="10"
          step="1"
          value={frameSize}
          name="frame size"
          onChange={onTextImputChange}
        />
      </label>

      <label className="App__input-label">
        {'Enter slider change step: '}
        <input
          type="number"
          min="0"
          max="10"
          step="1"
          value={step}
          name="slider step"
          onChange={onTextImputChange}
        />
      </label>

      <label className="App__input-label">
        {'Enter animation duration: '}
        <input
          type="number"
          min="0"
          max="10000"
          step="250"
          name="animation duration"
          value={animationDuration}
          onChange={onTextImputChange}
        />
      </label>

      <label className="App__input-label">
        {'Choose if the slider should be infinite: '}
        <input
          type="checkbox"
          checked={infinite}
          onChange={onCheckInputChange}
        />
      </label>
    </div>
  );
};
