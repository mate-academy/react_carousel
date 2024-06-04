import React from 'react';
import './Customize.scss';

type Props = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Settings: React.FC<Props> = ({
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
  handleChange,
}) => {
  return (
    <form className="Settings">
      <label className="Settings__item" htmlFor="itemId">
        Item Width:
        <input
          className="Settings__input"
          id="itemId"
          name="itemWidth"
          type="number"
          value={itemWidth}
          onChange={handleChange}
          step={10}
          min={130}
        />
      </label>

      <label className="Settings__item" htmlFor="frameId">
        Frame Size:
        <input
          className="Settings__input"
          id="frameId"
          name="frameSize"
          type="number"
          value={frameSize}
          onChange={handleChange}
          step={1}
          min={3}
        />
      </label>

      <label className="Settings__item" htmlFor="stepId">
        Step:
        <input
          className="Settings__input"
          id="stepId"
          name="step"
          type="number"
          value={step}
          onChange={handleChange}
          min={1}
          step={1}
        />
      </label>

      <label className="Settings__item" htmlFor="animationDurationId">
        Animation Duration:
        <input
          className="Settings__input"
          id="animationDurationId"
          name="animationDuration"
          type="number"
          value={animationDuration}
          onChange={handleChange}
          min={1000}
          step={100}
        />
      </label>

      <label className="Settings__item" htmlFor="infiniteId">
        Infinite:
        <input
          className="Settings__input"
          id="infiniteId"
          name="infinite"
          type="checkbox"
          checked={infinite}
          onChange={handleChange}
        />
      </label>
    </form>
  );
};
