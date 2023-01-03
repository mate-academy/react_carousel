import { ChangeEvent, FC } from 'react';
import { InputHooks, InputSet } from '../../types';

import './Inputs.scss';

type Props = {
  props: InputSet
  hooks: InputHooks
};

export const Inputs: FC<Props> = ({ props, hooks }) => {
  const {
    setStep,
    setItemWidth,
    setFrameSize,
    setAnimationDuration,
    setInfinite,
    setDistance,
  } = hooks;

  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
    distance,
  } = props;

  const maxByLength = images.length / 2;
  const maxPixels = 200;
  const maxMilliseconds = 5000;
  const maxDistance = itemWidth * (images.length - frameSize);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { valueAsNumber, id } = event.currentTarget;

    switch (id) {
      case 'animationDuration':
        setAnimationDuration(Math.min(valueAsNumber, maxMilliseconds));
        break;

      case 'stepId':
        setStep(Math.min(valueAsNumber, maxByLength));
        break;

      case 'frameId':
        setFrameSize(Math.min(valueAsNumber, maxByLength));
        setDistance(Math.max(distance, -maxDistance + itemWidth));
        break;

      case 'itemId':
        setItemWidth(Math.min(valueAsNumber, maxPixels));
        break;

      case 'infinite':
        setInfinite(!infinite);
        break;

      default:
        break;
    }
  };

  return (
    <legend
      className="inputs"
      style={{ width: `${itemWidth * frameSize}px` }}
    >
      <label
        htmlFor="stepId"
        className="inputs__label"
      >
        Step:
        <input
          type="number"
          id="stepId"
          value={step}
          min={1}
          max={maxByLength}
          className="inputs__field"
          onChange={handleChange}
        />
      </label>

      <label
        htmlFor="frameId"
        className="inputs__label"
      >
        Items in frame:
        <input
          type="number"
          id="frameId"
          value={frameSize}
          min={1}
          max={maxByLength}
          className="inputs__field"
          onChange={handleChange}
        />
      </label>

      <label
        htmlFor="itemId"
        className="inputs__label"
      >
        Item size(px):
        <input
          type="number"
          id="itemId"
          value={itemWidth}
          min={100}
          max={maxPixels}
          className="inputs__field"
          onChange={handleChange}
        />
      </label>

      <label
        htmlFor="animationDuration"
        className="inputs__label"
      >
        Animation duration(ms):
        <input
          type="number"
          id="animationDuration"
          value={animationDuration}
          min={100}
          step={100}
          max={maxMilliseconds}
          className="inputs__field"
          onChange={handleChange}
        />
      </label>

      <label
        htmlFor="infinite"
        className="inputs__label"
      >
        Infinite rotation:
        <input
          type="checkbox"
          id="infinite"
          checked={infinite}
          onChange={handleChange}
          className="inputs__field"
        />
      </label>
    </legend>
  );
};
