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
  toogleInfinite: () => void;
};

export const Form:React.FC<Props> = ({
  itemWidth,
  handleChange,
  frameSize,
  step,
  animationDuration,
  images,
  infinite,
  toogleInfinite,
}) => (
  <form className="Form">
    <label htmlFor="itemId">
      Item width:
      <input
        id="itemId"
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

    <label htmlFor="frameId">
      Frame size:
      <input
        id="frameId"
        className="Form__input"
        type="number"
        name="frameSize"
        value={frameSize}
        min="1"
        max={images.length}
        onChange={handleChange}
      />
    </label>

    <label htmlFor="stepId">
      Step:
      <input
        id="stepId"
        className="Form__input"
        type="number"
        name="step"
        value={step}
        min="1"
        max={images.length - frameSize}
        onChange={handleChange}
      />
    </label>

    <label htmlFor="animationId">
      Animation duration:
      <input
        id="animationId"
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
        className="Form__input"
        type="checkbox"
        name="infinite"
        checked={infinite}
        onChange={toogleInfinite}
      />
    </label>
  </form>
);
