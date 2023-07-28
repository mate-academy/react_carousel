import React from 'react';
import './Form.scss';
import { Input } from '../../bits/Input';

type Props = {
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
  setWidth: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFrameSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setStep: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setAnimationDuration: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setInfinite: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Form: React.FC<Props> = ({
  setFrameSize,
  setWidth,
  setStep,
  setAnimationDuration,
  setInfinite,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  return (
    <div className="form">
      <Input
        title="Item Width"
        id="itemId"
        type="number"
        initialValue={itemWidth}
        onChangeHandler={setWidth}
        step={10}
        min={130}
      />

      <Input
        title="Frame Size"
        id="frameSize"
        type="number"
        initialValue={frameSize}
        min={1}
        max={5}
        onChangeHandler={setFrameSize}
      />

      <Input
        title="Step"
        id="step"
        type="number"
        initialValue={step}
        min={1}
        max={5}
        onChangeHandler={setStep}
      />

      <Input
        title="Animation Duration"
        id="animation"
        type="number"
        initialValue={animationDuration}
        step={500}
        min={0}
        onChangeHandler={setAnimationDuration}
      />

      <Input
        title="Infinite"
        id="infinite"
        type="checkbox"
        initialValue={infinite}
        onChangeHandler={setInfinite}
      />
    </div>
  );
};
