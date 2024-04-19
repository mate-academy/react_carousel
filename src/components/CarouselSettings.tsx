import React from 'react';
import './CarouselSettings.scss';

interface Props {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CarouselSettings: React.FC<Props> = ({
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  handleChange,
}) => {
  return (
    <form className="settings">
      <label className="settings__item" htmlFor="itemId">
        Item Width:
        <input
          type="number"
          className="settings__input"
          id="itemId"
          name="itemWidth"
          min={130}
          step={10}
          value={itemWidth}
          onChange={handleChange}
        />
      </label>

      <label className="settings__item" htmlFor="frameId">
        Frame Size:
        <input
          type="number"
          className="settings__input"
          id="frameId"
          name="frameSize"
          min={3}
          step={1}
          value={frameSize}
          onChange={handleChange}
        />
      </label>

      <label className="settings__item" htmlFor="stepId">
        Step:
        <input
          type="number"
          className="settings__input"
          id="stepId"
          name="step"
          min={1}
          step={1}
          value={step}
          onChange={handleChange}
        />
      </label>

      <label className="settings__item" htmlFor="animationDurationId">
        Animation Duration:
        <input
          type="number"
          className="settings__input"
          id="animationDurationId"
          name="animationDuration"
          min={1000}
          step={100}
          value={animationDuration}
          onChange={handleChange}
        />
      </label>

      <label className="settings__item" htmlFor="infiniteId">
        Infinite:
        <input
          type="checkbox"
          className="settings__input"
          id="infiniteId"
          name="infinite"
          checked={infinite}
          onChange={handleChange}
        />
      </label>
    </form>
  );
};

export default CarouselSettings;
