import { FC, useEffect } from 'react';
import { Input } from '../Input/Input';

import { InputHooks, InputValues } from '../../types';
import './InputSet.scss';

type Props = {
  values: InputValues
  hooks: InputHooks
};

const sizeDiff = [130, 130];

export const InputSet: FC<Props> = ({ values, hooks }) => {
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
  } = values;

  const maxByLength = images.length / 2;
  const maxPixels = 200;
  const maxMilliseconds = 5000;
  const max = -itemWidth * (images.length - frameSize);

  useEffect(() => (
    () => {
      setDistance(Math.max(distance - itemWidth, max + itemWidth));
    }
  ), [frameSize]);

  useEffect(() => (
    () => {
      const sizeHas = {
        increased: sizeDiff[1] < sizeDiff[0],
        decreased: sizeDiff[1] > sizeDiff[0],
      };

      setDistance(state => {
        if (!state || state === max) {
          return state;
        }

        switch (true) {
          case sizeHas.decreased:
            return Math.min(state + frameSize, 0);

          case sizeHas.increased:
            return Math.max(state - frameSize, max);

          default:
            return state;
        }
      });
    }
  ), [itemWidth]);

  sizeDiff.unshift(itemWidth);
  sizeDiff.splice(2, 1);

  return (
    <legend
      className="input-set"
      style={{ width: `${itemWidth * frameSize}px` }}
    >
      <Input
        inputId="step"
        type="number"
        value={step}
        min={1}
        max={maxByLength}
        handleChange={setStep}
        info="Step:"
      />

      <Input
        inputId="frame"
        type="number"
        value={frameSize}
        min={1}
        max={maxByLength}
        handleChange={setFrameSize}
        info="Items in frame:"
      />

      <Input
        inputId="itemWidth"
        type="number"
        value={itemWidth}
        min={100}
        max={maxPixels}
        handleChange={setItemWidth}
        info="Item width (px):"
      />

      <Input
        type="number"
        inputId="animationDuration"
        value={animationDuration}
        min={100}
        step={100}
        max={maxMilliseconds}
        handleChange={setAnimationDuration}
        info="Animation duration (ms):"
      />

      <Input
        type="checkbox"
        inputId="infinite"
        checked={infinite}
        handleCheck={setInfinite}
        info="Infinite rotation:"
      />
    </legend>
  );
};
