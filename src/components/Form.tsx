import React from 'react';

interface Props {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;

  onChangeWidth: (value: number) => void;
  onChangeSize: (value: number) => void;
  onChangeStep: (value: number) => void;
  onChangeAnimation: (value: number) => void;
  onChangeInfinite: (value: boolean) => void;
}

const Form: React.FC<Props> = ({
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
  onChangeWidth,
  onChangeSize,
  onChangeStep,
  onChangeAnimation,
  onChangeInfinite,
}) => (
  <fieldset>
    <legend>Carousel settings</legend>
    <label htmlFor="itemId">
      Enter item width:
      <input
        id="itemId"
        type="number"
        value={itemWidth}
        data-cy="itemWidth"
        onChange={e => onChangeWidth(Number(e.target.value))}
      />
    </label>
    <label htmlFor="frameId">
      Enter frame size:
      <input
        id="frameId"
        type="number"
        value={frameSize}
        data-cy="frameSize"
        onChange={e => onChangeSize(Number(e.target.value))}
      />
    </label>
    <label htmlFor="stepId">
      Enter step:
      <input
        id="stepId"
        type="number"
        value={step}
        data-cy="step"
        onChange={e => onChangeStep(Number(e.target.value))}
      />
    </label>
    <label htmlFor="animationDurationId">
      Enter animation duration:
      <input
        id="animationDurationId"
        type="number"
        value={animationDuration}
        data-cy="animationDuration"
        onChange={e => onChangeAnimation(Number(e.target.value))}
      />
    </label>
    <label htmlFor="infiniteId">
      Infinite mode:
      <input
        id="infiniteId"
        type="checkbox"
        checked={infinite}
        onChange={e => onChangeInfinite(e.target.checked)}
      />
    </label>
  </fieldset>
);

export default Form;
