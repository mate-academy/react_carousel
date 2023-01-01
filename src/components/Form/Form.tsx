import React from 'react';
import './Form.scss';

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
    <label>
      Item width:
      <input
        className="Form__input"
        type="number"
        name="itemWidth"
        value={itemWidth}
        min="100"
        max="200"
        step="5"
        onChange={handleChange}
      />
    </label>

    <label>
      Frame size:
      <input
        className="Form__input"
        type="number"
        name="frameSize"
        value={frameSize}
        min="1"
        max={images.length}
        onChange={handleChange}
      />
    </label>

    <label>
      Step:
      <input
        className="Form__input"
        type="number"
        name="step"
        id="Step"
        value={step}
        min="1"
        max={images.length - frameSize}
        onChange={handleChange}
      />
    </label>

    <label>
      Animation duration:
      <input
        className="Form__input"
        type="number"
        name="animationDuration"
        value={animationDuration}
        min="100"
        max="5000"
        step="100"
        onChange={handleChange}
      />
    </label>

    <label>
      Infinite:
      <input
        className="Form__input Form__input--checkbox"
        type="checkbox"
        name="infinite"
        checked={infinite}
        onChange={handleInfinite}
      />
    </label>
  </form>
);
