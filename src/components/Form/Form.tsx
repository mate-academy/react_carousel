import React from 'react';
import './Form.scss';

interface Props {
  imageSize: number;
  setImageSize: (imageSize: number) => void;
  frameSize: number;
  setFrameSize: (frameSize: number) => void;
  step: number;
  setStep: (step: number) => void;
  animationDuration: number;
  setAnimationDuration: (animationDuration: number) => void;
  infinity: boolean;
  setInfiity: (infinity: boolean) => void;

}

export const Form: React.FC<Props> = ({
  imageSize,
  setImageSize,
  frameSize,
  setFrameSize,
  step,
  setStep,
  animationDuration,
  setAnimationDuration,
  infinity,
  setInfiity,
}) => {
  const handleCheckboxChange = () => {
    setInfiity(!infinity);
  };

  return (
    <div className="form">
      <div className="form__block">
        <label
          htmlFor="itemSize"
          className="form__block-lable"
        >
          Image size
        </label>

        <input
          className="form__block-input"
          type="number"
          id="itemSize"
          value={imageSize}
          onChange={(event) => setImageSize(+event.target.value)}
          step={10}
          min={10}
        />
      </div>

      <div className="form__block">
        <label
          htmlFor="carouselSize"
          className="form__block-lable"
        >
          Frame size
        </label>

        <input
          className="form__block-input"
          type="number"
          id="carouselSize"
          value={frameSize}
          onChange={(event) => setFrameSize(+event.target.value)}
          step={1}
          min={1}
          max={10}
        />
      </div>

      <div className="form__block">
        <label
          htmlFor="step"
          className="form__block-lable"
        >
          Step
        </label>

        <input
          className="form__block-input"
          type="number"
          id="step"
          value={step}
          onChange={(event) => setStep(+event.target.value)}
          step={1}
          min={1}
          max={10}
        />
      </div>

      <div className="form__block">
        <label
          className="form__block-lable"
          htmlFor="animationDuration"
        >
          Animation Duratation
        </label>

        <input
          className="form__block-input"
          type="number"
          id="animationDuration"
          value={animationDuration}
          onChange={(event) => setAnimationDuration(+event.target.value)}
          step={100}
          min={100}
          max={10000}
        />
      </div>

      <div className="form__block">
        <label
          htmlFor="infinity"
          className="form__block-lable"
        >
          Infinity
        </label>

        <input
          className="form__block-input"
          type="checkbox"
          id="infinity"
          checked={infinity}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};
