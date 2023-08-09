import React from 'react';
import './Settings.scss';

interface Props {
  itemWidth: number,
  imageCount: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  setItemWidth: (value: number) => void,
  setFrameSize: (value: number) => void,
  setStep: (value: number) => void,
  setAnimationDuration: (value: number) => void;
}

const Settings: React.FC<Props> = ({
  itemWidth,
  imageCount,
  frameSize,
  step,
  animationDuration,
  setItemWidth,
  setFrameSize,
  setStep,
  setAnimationDuration,
}) => (
  <>
    <div className="SlideContainer__wrapper">
      <div className="SlideContainer__width">
        <label
          className="Settings__label"
          htmlFor="itemWidth"
        >
          Image width:
        </label>

        <span className="Settings__currentValue">
          {itemWidth}
        </span>

        <input
          className="Slider"
          type="range"
          value={itemWidth}
          min={50}
          max={300}
          onChange={(event) => setItemWidth(+event.target.value)}
          id="itemWidth"
        />
      </div>

      <div className="SlideContainer__count">
        <label
          className="Settings__label"
          htmlFor="frameSize"
        >
          Images count:
        </label>

        <span className="Settings__currentValue">
          {frameSize}
        </span>

        <input
          className="Slider"
          type="range"
          min={1}
          max={Math.floor(imageCount / 2)}
          value={frameSize}
          onChange={(event) => setFrameSize(+event.target.value)}
          id="frameSize"
        />
      </div>

      <div className="SlideContainer__step">
        <label
          className="Settings__label"
          htmlFor="step"
        >
          Scrolling step:
        </label>

        <span className="Settings__currentValue">{step}</span>

        <input
          className="Slider"
          type="range"
          value={step}
          min={1}
          max={imageCount}
          onChange={(event) => setStep(+event.target.value)}
          id="step"
        />
      </div>

      <div className="SlideContainer__animation">
        <label
          className="Settings__label"
          htmlFor="animationDuration"
        >
          Animation speed:
        </label>

        <span className="Settings__currentValue">{animationDuration}</span>

        <input
          className="Slider"
          type="range"
          min={300}
          max={1500}
          value={animationDuration}
          onChange={(event) => setAnimationDuration(+event.target.value)}
          id="animationDuration"
        />
      </div>
    </div>

  </>
);

export default Settings;
