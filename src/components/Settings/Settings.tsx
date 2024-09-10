import React from 'react';
import './Settings.scss';

type Props = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  setSettings: (
    value: React.SetStateAction<{
      itemWidth: number;
      frameSize: number;
      step: number;
      animationDuration: number;
      infinite: boolean;
    }>,
  ) => void;
};

export const Settings: React.FC<Props> = ({
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
  setSettings,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const newValue = name === 'infinite' ? !infinite : +value;

    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: newValue,
    }));
  };

  return (
    <form className="Settings">
      <label className="Settings__item" htmlFor="itemId">
        Item Width:
        <input
          className="Settings__input"
          type="number"
          id="itemId"
          name="itemWidth"
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
          type="number"
          id="frameId"
          name="frameSize"
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
          type="number"
          id="stepId"
          name="step"
          value={step}
          onChange={handleChange}
          step={1}
          min={3}
        />
      </label>

      <label className="Settings__item" htmlFor="animationDurationId">
        Animation Duration:
        <input
          className="Settings__input"
          type="number"
          id="animationDurationId"
          name="animationDuration"
          value={animationDuration}
          onChange={handleChange}
          step={1000}
          min={1000}
        />
      </label>

      <label className="Settings__item" htmlFor="infiniteId">
        Infinite:
        <input
          className="Settings__input"
          type="checkbox"
          id="infiniteId"
          name="infinite"
          checked={infinite}
          onChange={handleChange}
        />
      </label>
    </form>
  );
};
