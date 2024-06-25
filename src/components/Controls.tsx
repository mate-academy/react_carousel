import React from 'react';
import './Controls.scss';

type ControlsProps = {
  frameSize: number;
  itemWidth: number;
  step: number;
  duration: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Controls = ({
  frameSize,
  itemWidth,
  step,
  duration,
  handleChange,
}: ControlsProps) => {
  return (
    <form className="controls">
      <div className="controls__wrapper">
        <label className="controls__label" htmlFor="itemId">
          Image Width
        </label>
        <input
          id="itemId"
          name="itemWidth"
          className="controls__input"
          type="number"
          min={130}
          max={200}
          step={10}
          value={itemWidth}
          placeholder="Set a image width"
          onChange={handleChange}
        />
      </div>

      <div className="controls__wrapper">
        <label className="controls__label" htmlFor="frameId">
          Frame Size
        </label>
        <input
          id="frameId"
          name="frameSize"
          className="controls__input"
          type="number"
          min={1}
          max={10}
          placeholder="Set a frame size"
          value={frameSize}
          onChange={handleChange}
        />
      </div>

      <div className="controls__wrapper">
        <label className="controls__label" htmlFor="stepId">
          Slide Step
        </label>
        <input
          id="stepId"
          name="step"
          className="controls__input"
          type="number"
          min={1}
          max={5}
          value={step}
          onChange={handleChange}
          placeholder="Set a step from 1 to 5"
        />
      </div>

      <div className="controls__wrapper">
        <label className="controls__label" htmlFor="animation">
          Animation
        </label>
        <input
          name="duration"
          id="animation"
          className="controls__input"
          placeholder="Change duration"
          type="number"
          min={300}
          max={3000}
          step={100}
          value={duration}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};
