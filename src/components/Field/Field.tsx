import React from 'react';
import './Field.scss';

type Props = {
  step: number,
  frameSize: number,
  imageSize: number,
  animationDuration: number,
  onChangeStep: (arg: number) => void,
  onChangeFrameSize: (arg: number) => void;
  onChangeImageSize: (arg: number) => void;
  onChangeAnimDuration: (arg: number) => void;
};

export const Field: React.FC<Props> = ({
  step,
  frameSize,
  imageSize,
  animationDuration,
  onChangeStep,
  onChangeFrameSize,
  onChangeImageSize,
  onChangeAnimDuration,
}) => {
  return (
    <fieldset className="Field">
      <form>
        <div className="Field__container">
          <label className="Field__label" htmlFor="step-input">
            Step:
          </label>
          <input
            id="step-input"
            className="Field__input Field__input--step"
            type="number"
            min="1"
            max="10"
            value={step}
            onChange={({ target }) => {
              onChangeStep(+target.value);
            }}
          />
        </div>

        <div className="Field__container">
          <label className="Field__label" htmlFor="frame-input">
            Frame Size:
          </label>
          <input
            id="frame-input"
            className="Field__input Field__input--frame"
            type="number"
            min="3"
            max={1300 / imageSize}
            value={frameSize}
            onChange={({ target }) => {
              onChangeFrameSize(+target.value);
            }}
          />
        </div>

        <div className="Field__container">
          <label className="Field__label" htmlFor="width-input">
            Item width:
          </label>
          <input
            id="width-input"
            className="Field__input Field__input--width"
            type="number"
            min="130"
            max={1300 / frameSize}
            value={imageSize}
            step="10"
            onChange={({ target }) => {
              onChangeImageSize(+target.value);
            }}
          />
        </div>

        <div className="Field__container">
          <label className="Field__label" htmlFor="animation=input">
            Animation Duration:
          </label>
          <input
            id="animation-input"
            className="Field__input"
            type="number"
            min="400"
            value={animationDuration}
            step="100"
            onChange={({ target }) => {
              onChangeAnimDuration(+target.value);
            }}
          />
        </div>
      </form>
    </fieldset>
  );
};
