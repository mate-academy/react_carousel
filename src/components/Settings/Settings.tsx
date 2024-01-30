import React from 'react';
import './Settings.scss';

interface SettingsProps {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

interface SettingsStateProps extends SettingsProps {
  setStep: (newStep: number) => void,
  setFrameSize: (newFrameSize: number) => void,
  setItemWidth: (newItemWidth: number) => void,
  setAnimationDuration: (newAnimationDuration: number) => void,
  setInfinite: (newInfinite: boolean) => void,
}

const Settings: React.FC<SettingsStateProps> = ({
  images,
  step,
  setStep,
  frameSize,
  setFrameSize,
  itemWidth,
  setItemWidth,
  animationDuration,
  setAnimationDuration,
  infinite,
  setInfinite,
}) => {
  return (
    <form
      action="#"
      method="GET"
      className="SettingForm"
    >
      <label htmlFor="stepId" className="SettingForm__label">
        Step:
        <input
          id="stepId"
          type="number"
          className="SettingForm__input"
          min={1}
          max={images.length - frameSize}
          value={step}
          onChange={(event) => setStep(+event.currentTarget.value)}
        />
      </label>
      <label htmlFor="frameSizeId" className="SettingForm__label">
        Frame size:
        <input
          id="fremeSizeId"
          type="number"
          className="SettingForm__input"
          min={1}
          max={images.length}
          value={frameSize}
          onChange={(event) => setFrameSize(+event.currentTarget.value)}
        />
      </label>
      <label htmlFor="itemWidthId" className="SettingForm__label">
        Item width:
        <input
          id="itemWidthId"
          type="number"
          className="SettingForm__input"
          min={50}
          step={5}
          value={itemWidth}
          onChange={(event) => setItemWidth(+event.currentTarget.value)}
        />
      </label>
      <label htmlFor="animationDurationId" className="SettingForm__label">
        Animation duration:
        <input
          id="animationDurationId"
          type="number"
          className="SettingForm__input"
          min={0}
          step={100}
          value={animationDuration}
          onChange={(event) => setAnimationDuration(+event.currentTarget.value)}
        />
      </label>

      <label htmlFor="infiniteId" className="SettingForm__label">
        Infinite:
        <input
          id="infiniteId"
          type="checkbox"
          className="SettingForm__checkbox"
          checked={infinite}
          onChange={(event) => setInfinite(event.target.checked)}
        />
      </label>
    </form>
  );
};

export default Settings;
