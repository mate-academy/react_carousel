import React, { ChangeEvent } from 'react';

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
          type="text"
          value={itemWidth}
          name="item width"
          onChange={onTextImputChange}
        />
      </label>

      <label className="App__input-label">
        {'Enter slider frame size: '}
        <input
          type="text"
          value={frameSize}
          name="frame size"
          onChange={onTextImputChange}
        />
      </label>

      <label className="App__input-label">
        {'Enter slider change step: '}
        <input
          type="text"
          value={step}
          name="slider step"
          onChange={onTextImputChange}
        />
      </label>

      <label className="App__input-label">
        {'Enter animation duration: '}
        <input
          type="text"
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
