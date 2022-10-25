import React from 'react';
import { Input } from './Input';

type Props = {
  newItemWidth: (value:number) => void,
  newStep: (value:number) => void,
  newDuration: (value:number) => void,
  newFrameSize: (value:number) => void,
};

export const Container: React.FC<Props> = ({
  newItemWidth,
  newStep,
  newDuration,
  newFrameSize,
}) => {
  return (
    <div>
      <Input
        name="width"
        defaultValue={130}
        min={50}
        max={260}
        step={10}
        onChange={newItemWidth}
      />
      <Input
        name="step"
        defaultValue={3}
        min={1}
        max={10}
        step={1}
        onChange={newStep}
      />
      <Input
        name="duration"
        defaultValue={1000}
        min={500}
        max={3000}
        step={500}
        onChange={newDuration}
      />
      <Input
        name="frame-size"
        defaultValue={3}
        min={1}
        max={10}
        step={1}
        onChange={newFrameSize}
      />
    </div>
  );
};
