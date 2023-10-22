import React from 'react';
import './Options.scss';

type Props = {
  state: {
    itemWidth: number;
    frameSize: number;
    step: number;
    animationDuration: number;
    infinite: boolean;
  };
  images: string[];
  setState: (state: {
    itemWidth: number;
    frameSize: number;
    step: number;
    animationDuration: number;
    infinite: boolean;
  }) => void;
};

export const Options: React.FC<Props> = ({
  state,
  images,
  setState,
}) => {
  const {
    itemWidth,
    frameSize,
    step,
    animationDuration,
    infinite,
  } = state;

  return (
    <div className="options">
      <label htmlFor="itemId" className="options__label">
        Item Width:
        <input
          className="options__input"
          type="number"
          id="itemId"
          value={itemWidth}
          min={130}
          max={260}
          step={10}
          onChange={
            (event) => setState({ ...state, itemWidth: +event.target.value })
          }
        />
      </label>

      <label htmlFor="frameId" className="options__label">
        Frame Size:
        <input
          className="options__input"
          type="number"
          id="frameId"
          value={frameSize}
          min={1}
          max={images.length}
          step={1}
          onChange={
            (event) => setState({ ...state, frameSize: +event.target.value })
          }
        />
      </label>

      <label htmlFor="stepId" className="options__label">
        Step:
        <input
          className="options__input"
          type="number"
          id="stepId"
          value={step}
          min={1}
          max={images.length}
          step={1}
          onChange={
            (event) => setState({ ...state, step: +event.target.value })
          }
        />
      </label>

      <label htmlFor="animationId" className="options__label">
        AnimationDuration:
        <input
          className="options__input"
          type="number"
          id="animationId"
          value={animationDuration}
          min={500}
          max={5000}
          step={500}
          onChange={
            (event) => setState(
              { ...state, animationDuration: +event.target.value },
            )
          }
        />
      </label>

      <label htmlFor="infinityId" className="options__label">
        Infinite:
        <input
          type="checkbox"
          id="infinityId"
          checked={infinite}
          onChange={() => setState({ ...state, infinite: !infinite })}
        />
      </label>
    </div>
  );
};
