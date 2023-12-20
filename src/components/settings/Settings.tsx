import React from 'react';
import './Settings.scss';

interface Props {
  width: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultSettings = {
  width: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: false,
};

const Settings = ({
  width,
  frameSize,
  step,
  animationDuration,
  infinite,
  handleChange,
}: Props) => {
  return (
    <div className="settings">
      <label className="settings__label" htmlFor="itemId">
        Item width:
        <input
          id="itemId"
          className="settings__input"
          name="width"
          type="number"
          min={defaultSettings.width}
          value={width}
          onChange={handleChange}
        />
      </label>

      <label className="settings__label" htmlFor="frameId">
        Frame size:
        <input
          id="frameId"
          className="settings__input"
          name="frameSize"
          type="number"
          min={defaultSettings.frameSize}
          step="1"
          value={frameSize}
          onChange={handleChange}
        />
      </label>

      <label className="settings__label" htmlFor="stepId">
        Step:
        <input
          id="stepId"
          className="settings__input"
          name="step"
          type="number"
          min={defaultSettings.step}
          step="1"
          value={step}
          onChange={handleChange}
        />
      </label>

      <label className="settings__label" htmlFor="durationId">
        Animation duration:
        <input
          id="durationId"
          className="settings__input"
          name="animationDuration"
          type="number"
          min={defaultSettings.animationDuration}
          step="500"
          value={animationDuration}
          onChange={handleChange}
        />
      </label>

      <label className="settings__label" htmlFor="infiniteId">
        Infinite:
        <input
          id="infiniteId"
          className="settings__input"
          name="infinite"
          type="checkbox"
          checked={infinite}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default Settings;
