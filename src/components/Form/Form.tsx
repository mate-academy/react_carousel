import React from 'react';
import './Form.scss';
import '../Input/Input.scss';
import { Input } from '../Input';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  hadleInfinite: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Form: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  hadleInfinite,
  handleChange,
}) => (
  <form className="Form">
    <Input
      labelText="Item width"
      id="itemId"
      name="itemWidth"
      value={itemWidth}
      min="100"
      max="200"
      step="5"
      onChange={handleChange}
    />

    <Input
      labelText="Frame size"
      id="frameId"
      name="frameSize"
      value={frameSize}
      min="1"
      max={`${images.length}`}
      step="1"
      onChange={handleChange}
    />

    <Input
      labelText="Step"
      id="stepId"
      name="step"
      value={step}
      min="1"
      max={`${images.length - frameSize}`}
      step="1"
      onChange={handleChange}
    />

    <Input
      labelText="Duration"
      id="animationId"
      name="animationDuration"
      value={animationDuration}
      min="500"
      max="5000"
      step="100"
      onChange={handleChange}
    />

    <label
      className="Form--infinite"
    >
      <input
        className="Form--checked"
        name="infinite"
        type="checkbox"
        checked={infinite}
        onChange={hadleInfinite}
      />
      Infinite
    </label>
  </form>
);
