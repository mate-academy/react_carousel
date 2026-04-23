import React from 'react';
import './CarouselSettings.scss';

interface CarouselSettingsProps {
  currentWidth: number;
  onWidthChange: (currentWidth: number) => void;
  frameSize: number;
  onframeSize: (frameSize: number) => void;
  step: number;
  onStepChange: (step: number) => void;
  animationDuration: number;
  onAnimationDuration: (animationDuration: number) => void;
}

export const CarouselSettings: React.FC<CarouselSettingsProps> = ({
  currentWidth,
  onWidthChange,
  frameSize,
  onframeSize,
  step,
  onStepChange,
  animationDuration,
  onAnimationDuration,
}) => (
  <div className="input__container">
    <div className="input__wrapper">
      <label className="input__label" htmlFor="itemId">
        Item Width:
      </label>
      <input
        id="itemId"
        type="number"
        className="input__inputs"
        value={currentWidth}
        min="0"
        onChange={e => onWidthChange(Number(e.currentTarget.value))}
      />
    </div>

    <div className="input__wrapper">
      <label className="input__label" htmlFor="frameId">
        Number of items:
      </label>
      <input
        id="frameId"
        type="number"
        className="input__inputs"
        value={frameSize}
        min="1"
        onChange={e => onframeSize(Number(e.currentTarget.value))}
      />
    </div>

    <div className="input__wrapper">
      <label className="input__label" htmlFor="stepId">
        Step:
      </label>
      <input
        id="stepId"
        type="number"
        className="input__inputs"
        value={step}
        min="1"
        onChange={e => onStepChange(Number(e.currentTarget.value))}
      />
    </div>

    <div className="input__wrapper">
      <label className="input__label" htmlFor="animationId">
        Duration of Animation:
      </label>
      <input
        id="animationId"
        type="number"
        className="input__inputs"
        value={animationDuration}
        min="1"
        onChange={e => onAnimationDuration(Number(e.currentTarget.value))}
      />
    </div>
  </div>
);
