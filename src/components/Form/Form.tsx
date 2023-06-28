import React from 'react';
import { Params } from '../../types/Params';
import './Form.scss';

interface Props {
  max: number,
  visabilityParams: Params,
  handleChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Form: React.FC<Props> = ({
  visabilityParams,
  max,
  handleChangeValue,
}) => {
  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
  } = visabilityParams;

  return (
    <form className="form">
      <label
        htmlFor="itemId"
        className="form__label"
      >
        Item Width:
        <input
          className="form__input"
          name="itemWidth"
          id="itemId"
          type="number"
          min={30}
          step={10}
          max={300}
          value={itemWidth}
          onChange={handleChangeValue}
        />
      </label>

      <label
        htmlFor="frameId"
        className="form__label"
      >
        Frame Size:
        <input
          className="form__input"
          name="frameSize"
          id="frameId"
          type="number"
          min={1}
          step={1}
          max={max}
          value={frameSize}
          onChange={handleChangeValue}
        />
      </label>

      <label
        htmlFor="stepId"
        className="form__label"
      >
        Step:
        <input
          className="form__input"
          name="step"
          id="stepId"
          type="number"
          min={1}
          step={1}
          max={max}
          value={step}
          onChange={handleChangeValue}
        />
      </label>

      <label
        htmlFor="animationId"
        className="form__label"
      >
        Animation duration:
        <input
          className="form__input"
          name="animationDuration"
          id="animationId"
          type="number"
          min={100}
          step={100}
          max={5000}
          value={animationDuration}
          onChange={handleChangeValue}
        />
      </label>

      <label className="form__label">
        Infinite:
        <input
          className="form__input"
          name="infinite"
          id="infinite"
          type="checkbox"
          onChange={handleChangeValue}
        />
      </label>
    </form>
  );
};
