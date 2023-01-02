import { ChangeEvent, FC } from 'react';
import { SettingHooks, SettingsType } from '../../types';

import './Settings.scss';

type Props = {
  props: SettingsType
  hooks: SettingHooks
};

export const Settings: FC<Props> = ({ props, hooks }) => {
  const {
    setStep,
    setItemWidth,
    setFrameSize,
    setAnimationDuration,
    setInfinite,
    setDistance,
  } = hooks;

  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
    distance,
  } = props;

  const maxByLength = images.length / 2;
  const maxPixels = 200;
  const maxMilliseconds = 5000;
  const maxDistance = itemWidth * (images.length - frameSize);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { valueAsNumber, id } = event.currentTarget;

    switch (id) {
      case 'animationDuration':
        setAnimationDuration(Math.min(valueAsNumber, maxMilliseconds));
        break;

      case 'step':
        setStep(Math.min(valueAsNumber, maxByLength));
        break;

      case 'frameSize':
        setFrameSize(Math.min(valueAsNumber, maxByLength));
        setDistance(Math.max(distance, -maxDistance + itemWidth));
        break;

      case 'itemWidth':
        setItemWidth(Math.min(valueAsNumber, maxPixels));
        break;

      case 'infinite':
        setInfinite(!infinite);
        break;

      default:
        break;
    }
  };

  return (
    <legend
      className="settings"
      style={{ width: `${itemWidth * frameSize}px` }}
    >
      <label
        htmlFor="stepId"
        className="settings__label"
      >
        Step:
        <input
          type="number"
          id="stepId"
          value={step}
          min={1}
          max={maxByLength}
          className="settings__field"
          onChange={handleChange}
        />
      </label>

      <label
        htmlFor="frameId"
        className="settings__label"
      >
        Items in frame:
        <input
          type="number"
          id="frameId"
          value={frameSize}
          min={1}
          max={maxByLength}
          className="settings__field"
          onChange={handleChange}
        />
      </label>

      <label
        htmlFor="itemId"
        className="settings__label"
      >
        Item size(px):
        <input
          type="number"
          id="itemId"
          value={itemWidth}
          min={100}
          max={maxPixels}
          className="settings__field"
          onChange={handleChange}
        />
      </label>

      <label
        htmlFor="animationDuration"
        className="settings__label"
      >
        Animation duration(ms):
        <input
          type="number"
          id="animationDuration"
          value={animationDuration}
          min={100}
          step={100}
          max={maxMilliseconds}
          className="settings__field"
          onChange={handleChange}
        />
      </label>

      <label
        htmlFor="infinite"
        className="settings__label"
      >
        Infinite rotation:
        <input
          type="checkbox"
          id="infinite"
          checked={infinite}
          onChange={handleChange}
          className="settings__field"
        />
      </label>
    </legend>
  );
};
