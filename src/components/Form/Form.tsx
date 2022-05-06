import React from 'react';
import { Sizes } from '../../types/Sizes';
import './Form.scss';

type Props = Omit<Sizes, 'infinite'> & {
  images: string[];
  submitFuction: (event: { target: { name: string; value: string; }; }) => void;
};

export const Form: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  submitFuction,
}) => {
  return (
    <form
      method="get"
      className="form"
    >
      Change properties:
      <label className="form__label">
        Item Width (px):
        <input
          name="itemWidth"
          type="number"
          min="100"
          max="160"
          placeholder="Images Width (px)"
          defaultValue={itemWidth}
          required
          className="form__input"
          onChange={submitFuction}
        />
      </label>

      <label className="form__label">
        Frame Size:
        <input
          name="frameSize"
          type="number"
          min="1"
          max={images.length}
          placeholder="Frame Size"
          defaultValue={frameSize}
          required
          className="form__input"
          onChange={submitFuction}
        />
      </label>

      <label className="form__label">
        Step:
        <input
          name="step"
          type="number"
          min="1"
          max={images.length - frameSize}
          placeholder="Scroll Step"
          defaultValue={step}
          required
          className="form__input"
          onChange={submitFuction}
        />
      </label>

      <label className="form__label">
        Animation Duration (ms):
        <input
          name="animationDuration"
          type="number"
          min="0"
          max="10000"
          step="100"
          placeholder="Animation Duration (ms)"
          defaultValue={animationDuration}
          required
          className="form__input"
          onChange={submitFuction}
        />
      </label>

      <label className="form__label">
        Infinite:
        <select
          name="infinite"
          required
          className="form__input"
          onChange={submitFuction}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </label>
    </form>
  );
};
