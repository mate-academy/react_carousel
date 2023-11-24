import React from 'react';
import './Form.scss';
import { FormData } from '../../Types/State';

const Form: React.FC<FormData> = ({
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
}) => (
  <form className="Form">
    <label className="Form__label" htmlFor="stepId">
      Step:

      <input
        id="stepId"
        value={step}
        min={1}
        max={images.length - frameSize}
        type="number"
        className="Form__input"
        onChange={(event) => setStep(+event.currentTarget.value)}
      />
    </label>
    <label className="Form__label" htmlFor="frameId">
      Frame size:

      <input
        id="frameId"
        value={frameSize}
        min={1}
        max={images.length}
        type="number"
        className="Form__input"
        onChange={(event) => setFrameSize(+event.currentTarget.value)}
      />
    </label>
    <label className="Form__label" htmlFor="itemId">
      Item width:

      <input
        id="itemId"
        value={itemWidth}
        min={10}
        step={10}
        type="number"
        className="Form__input"
        onChange={(event) => setItemWidth(+event.currentTarget.value)}
      />
    </label>
    <label className="Form__label" htmlFor="animationDurationId">
      Animation duration:

      <input
        id="animationDurationId"
        value={animationDuration}
        min={0}
        step={100}
        type="number"
        className="Form__input"
        onChange={(event) => setAnimationDuration(+event.currentTarget.value)}
      />
    </label>
    <label className="Form__label" htmlFor="infiniteId">
      Infinite:

      <input
        id="infiniteId"
        type="checkbox"
        className="Form__input"
        checked={infinite}
        onChange={(event) => setInfinite(event.target.checked)}
      />
    </label>
  </form>
);

export default Form;
