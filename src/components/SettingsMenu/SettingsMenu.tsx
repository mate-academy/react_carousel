import React from 'react';

import './SettingsMenu.scss';

interface Props {
  setStep: (n: number) => void,
  setFrameSize: (n: number) => void,
  setItemWidth: (n: number) => void,
  setAnimationDuration: (n: number) => void,
  setInfinite: (i: boolean) => void,

  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

type EventInput = React.ChangeEvent<HTMLInputElement>;

const SettingsMenu: React.FC<Props> = ({
  setStep,
  setFrameSize,
  setItemWidth,
  setAnimationDuration,
  setInfinite,

  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => (
  <form action="#" className="SettingsMenu">
    <div className="SettingsMenu__param">
      <label className="SettingsMenu__label" htmlFor="stepId">Step:</label>
      <input
        type="number"
        name="step"
        id="stepId"
        className="SettingsMenu__input"
        value={step}
        onChange={(event: EventInput) => setStep(+event.target.value)}
      />
    </div>

    <div className="SettingsMenu__param">
      <label className="SettingsMenu__label" htmlFor="frameId">
        Frame size:
      </label>
      <input
        type="number"
        name="frameSize"
        id="frameId"
        className="SettingsMenu__input"
        value={frameSize}
        onChange={(event: EventInput) => setFrameSize(+event.target.value)}
      />
    </div>

    <div className="SettingsMenu__param">
      <label className="SettingsMenu__label" htmlFor="itemId">
        Item width:
      </label>
      <input
        type="number"
        name="itemWidth"
        id="itemId"
        className="SettingsMenu__input"
        value={itemWidth}
        onChange={(event: EventInput) => setItemWidth(+event.target.value)}
      />
    </div>

    <div className="SettingsMenu__param">
      <label className="SettingsMenu__label" htmlFor="animationDurationId">
        Animation duration:
      </label>
      <input
        type="number"
        name="animationDuration"
        id="animationDurationId"
        className="SettingsMenu__input"
        value={animationDuration}
        onChange={(event) => (setAnimationDuration(+event.target.value))}
      />
    </div>

    <div className="SettingsMenu__param">
      <label className="SettingsMenu__label" htmlFor="infiniteId">
        Infinity:
      </label>
      <input
        type="checkbox"
        name="infinite"
        id="infiniteId"
        className="SettingsMenu__input"
        checked={infinite}
        onChange={(event: EventInput) => setInfinite(event.target.checked)}
      />
    </div>

  </form>
);

/*
images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
*/

export default SettingsMenu;
