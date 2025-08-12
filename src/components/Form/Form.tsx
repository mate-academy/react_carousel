import React from 'react';

import './Form.scss';

type Props = {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  onStepChange: (value: number) => void;
  onFrameSizeChange: (value: number) => void;
  onItemWidthChange: (value: number) => void;
  onAnimationDurationChange: (value: number) => void;
  OnChangeInfinite: (infiniteVal: boolean) => void;
};
const Form: React.FC<Props> = ({
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  onStepChange,
  onFrameSizeChange,
  onItemWidthChange,
  onAnimationDurationChange,
  OnChangeInfinite,
}) => {
  return (
    <form className="Form">
      <label htmlFor="checkboxId" className="Form__label">
        infinite:
      </label>
      <input
        id="checkboxId"
        type="checkbox"
        checked={infinite}
        className="Form__checkbox"
        onChange={() => {
          if (infinite) {
            OnChangeInfinite(false);
          } else {
            OnChangeInfinite(true);
          }
        }}
      />

      <label htmlFor="stepId" className="Form__label">
        Step:
      </label>
      <input
        id="stepId"
        className="Form__input"
        type="number"
        min="1"
        max="9"
        value={step}
        onChange={ev => {
          const val = +ev.target.value;

          onStepChange(val < 1 ? 1 : val);
        }}
      />

      <label htmlFor="frameId" className="Form__label">
        Frame size:
      </label>
      <input
        id="frameId"
        className="Form__input"
        type="number"
        min="1"
        max="10"
        value={frameSize}
        onChange={ev => {
          const val = +ev.target.value;

          onFrameSizeChange(val < 1 ? 1 : val);
        }}
      />

      <label htmlFor="itemId" className="Form__label">
        Item width:
      </label>
      <input
        id="itemId"
        className="Form__input"
        type="number"
        min="110"
        max="200"
        value={itemWidth}
        onChange={ev => {
          const val = +ev.target.value;

          onItemWidthChange(val < 110 ? 110 : val);
        }}
      />

      <label htmlFor="animationId" className="Form__label">
        Animation duration:
      </label>
      <input
        id="animationId"
        className="Form__input"
        type="number"
        min="0"
        max="10000"
        value={animationDuration}
        onChange={ev => {
          onAnimationDurationChange(+ev.target.value);
        }}
      />
    </form>
  );
};

export default Form;
