import React from 'react';
import { FormParams } from '../../types/formParams';
import './Form.scss';

interface Props {
  max: number
  visabilityParams: FormParams
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Form: React.FC<Props> = ({
  visabilityParams,
  max,
  onChangeValue,
}) => {
  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
  } = visabilityParams;

  return (
    <form className="form">
      <label htmlFor="stepId" className="form__label">
        Step:&#160;
        <input
          className="form__input"
          type="number"
          name="step"
          id="stepId"
          min={1}
          step={1}
          max={max}
          value={step}
          onChange={onChangeValue}
        />
      </label>
      <label htmlFor="frameId" className="form__label">
        FrameSize:&#160;
        <input
          className="form__input"
          type="number"
          name="frameSize"
          id="frameId"
          min={1}
          step={1}
          max={max}
          value={frameSize}
          onChange={onChangeValue}
        />
      </label>
      <label htmlFor="itemId" className="form__label">
        ItemWidth:&#160;
        <input
          className="form__input"
          type="number"
          name="itemWidth"
          id="itemId"
          min={30}
          step={10}
          max={300}
          value={itemWidth}
          onChange={onChangeValue}
        />
      </label>
      <label htmlFor="animationId" className="form__label">
        AnimationDuration:&#160;
        <input
          className="form__input"
          type="number"
          name="animationDuration"
          id="animationId"
          min={100}
          step={100}
          max={5000}
          value={animationDuration}
          onChange={onChangeValue}
        />
      </label>
      <label htmlFor="infinite" className="form__label">
        Infinite:&#160;
        <input
          className="form__input"
          type="checkbox"
          id="infinite"
          name="infinite"
          onChange={onChangeValue}
        />
      </label>
    </form>
  );
};
