import { FC } from 'react';
import { Input } from './Input';
import { FormType } from '../Types';

export const Form: FC<FormType> = ({
  step,
  frameSize,
  itemWidth,
  animationDuration,
  imagesLength,
  changeState,
}) => (
  <form>
    <h2>Custom settings</h2>

    <Input
      type="number"
      step="20"
      min="50"
      value={`${itemWidth}`}
      dataName="itemWidth"
      changeState={changeState}
    >
      Image width
    </Input>

    <Input
      type="number"
      max={`${imagesLength}`}
      min="1"
      value={`${frameSize}`}
      dataName="frameSize"
      changeState={changeState}
    >
      Frame size
    </Input>

    <Input
      type="number"
      max={`${imagesLength}`}
      value={`${step}`}
      min="1"
      dataName="step"
      changeState={changeState}
    >
      Step
    </Input>

    <Input
      type="number"
      min="1000"
      step="200"
      value={`${animationDuration}`}
      dataName="animationDuration"
      changeState={changeState}
    >
      Animation duration
    </Input>

    <Input
      type="checkbox"
      dataName="infinite"
      changeState={changeState}
    >
      Infinite loop
    </Input>
  </form>
);
