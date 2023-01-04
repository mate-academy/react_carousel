import React from 'react';
import { Input } from '../Input';
import './Form.scss';
import '../Input/Input.scss';

type Props = {
  itemWidth: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  frameSize: number;
  step: number;
  animationDuration: number;
  images: string[];
  infinite: boolean;
  handleInfinite: () => void;
};

export const Form:React.FC<Props> = ({
  itemWidth,
  handleChange,
  frameSize,
  step,
  animationDuration,
  images,
  infinite,
  handleInfinite,
}) => (
  <form className="Form">
    <Input
      labelText="Item width:"
      id="itemId"
      name="itemWidth"
      value={itemWidth}
      min="100"
      max="200"
      step="5"
      onChange={handleChange}
    />

    <Input
      labelText="Frame size:"
      id="frameId"
      name="frameSize"
      value={frameSize}
      min="1"
      max={`${images.length}`}
      step="1"
      onChange={handleChange}
    />

    <Input
      labelText="Step:"
      id="stepId"
      name="step"
      value={step}
      min="1"
      max={`${images.length - frameSize}`}
      step="1"
      onChange={handleChange}
    />

    <Input
      labelText="Animation duration:"
      id="animationId"
      name="animationDuration"
      value={animationDuration}
      min="100"
      max="5000"
      step="100"
      onChange={handleChange}
    />

    <label>
      Infinite:
      <input
        className="Input Input--checkbox"
        type="checkbox"
        name="infinite"
        checked={infinite}
        onChange={handleInfinite}
      />
    </label>
  </form>
);
