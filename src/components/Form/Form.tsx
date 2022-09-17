import React from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input } from '../Input/Input';
import './Form.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
type HandleFunction = Function;

interface Props {
  itemWidth: string;
  frameSize: string;
  step: string;
  animationDuration: string;
  infinite: boolean;
  length: number,
  onChange: HandleFunction;
  onChecked: HandleFunction;
}

export const Form: React.FC<Props> = ({
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
  length,
  onChange,
  onChecked,
}) => {
  return (
    <form className="Form box">
      <Input
        label="Item Width"
        name="itemWidth"
        value={itemWidth}
        stepValue="10"
        minValue="80"
        maxValue="180"
        onChange={onChange}
      />

      <Input
        label="Frame Size"
        name="frameSize"
        value={frameSize}
        stepValue="1"
        minValue="1"
        maxValue={String(length)}
        onChange={onChange}
      />

      <Input
        label="Step"
        name="step"
        value={step}
        stepValue="1"
        minValue="1"
        maxValue="5"
        onChange={onChange}
      />

      <Input
        label="Animation Duration"
        name="animationDuration"
        value={animationDuration}
        stepValue="100"
        minValue="100"
        maxValue="3000"
        onChange={onChange}
      />

      <Checkbox
        label="Infinite"
        value={infinite}
        onChecked={onChecked}
      />
    </form>
  );
};
