import { FC } from 'react';
import './CarouselForm.scss';

type Props = {
  frameSize: number;
  step: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  maxFrameSize: number
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const CarouselForm: FC<Props> = ({
  frameSize,
  step,
  itemWidth,
  animationDuration,
  infinite,
  maxFrameSize,
  onFormSubmit,
}) => {
  return (
    <form className="form" onSubmit={onFormSubmit}>
      <div className="form__item">
        <label htmlFor="itemId">
          Item width:
        </label>

        <input
          type="number"
          className="form__input"
          id="itemId"
          name="itemWidth"
          min="50"
          max="300"
          step="10"
          defaultValue={itemWidth}
        />
      </div>

      <div className="form__item">
        <label htmlFor="frameId">
          Frame size:
        </label>

        <input
          type="number"
          className="form__input"
          id="frameId"
          name="frameSize"
          min="1"
          max={maxFrameSize}
          step="1"
          defaultValue={frameSize}
        />
      </div>

      <div className="form__item">
        <label htmlFor="stepId">
          Step:
        </label>

        <input
          type="number"
          className="form__input"
          id="stepId"
          name="step"
          min="1"
          max={maxFrameSize}
          step="1"
          defaultValue={step}
        />
      </div>

      <div className="form__item">
        <label htmlFor="animationDuration">
          Animation duration:
        </label>

        <input
          type="number"
          className="form__input"
          id="animationDuration"
          name="animationDuration"
          min="1000"
          max="5000"
          step="1000"
          defaultValue={animationDuration}
        />
      </div>

      <div className="form__item">
        <label htmlFor="infinite">
          Infinite:
        </label>

        <select
          name="infinite"
          id="infinite"
          className="form__input"
          defaultValue={infinite ? 'yes' : 'no'}
        >
          <option value="yes">
            Yes
          </option>

          <option value="no">
            No
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="form__button"
      >
        Apply
      </button>
    </form>
  );
};
