import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setAnimationDuration,
  setFrameSize,
  setInfinite,
  setItemWidth,
  setStep,
} from '../../features/formSlice';

import './FormParams.scss';
import { InputName } from '../../types/inputs';

export const FormParams = () => {
  const { images } = useAppSelector(state => state.images);
  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = useAppSelector(state => state.form);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const maxValue = images.length;
    const inputValue = +value > maxValue ? maxValue : +value;

    switch (name) {
      case InputName.STEP: {
        dispatch(setStep(inputValue));

        return;
      }

      case InputName.FRAME: {
        dispatch(setFrameSize(inputValue));

        return;
      }

      case InputName.ITEM: {
        dispatch(setItemWidth(+value));

        return;
      }

      case InputName.ANIMATION: {
        dispatch(setAnimationDuration(+value));

        return;
      }

      default: {
        dispatch(setInfinite());
      }
    }
  };

  return (
    <form className="formParams">
      <fieldset className="formParams__field">
        <legend> Configuration </legend>
        <label
          className="formParams__item"
          htmlFor="stepId"
        >
          Step:
          <input
            id="stepId"
            className="formParams__input"
            type="number"
            name={InputName.STEP}
            value={step}
            onChange={handleChange}
          />
        </label>
        <label
          className="formParams__item"
          htmlFor="frameId"
        >
          Frame Size:
          <input
            id="frameId"
            className="formParams__input"
            type="number"
            name={InputName.FRAME}
            value={frameSize}
            onChange={handleChange}
          />
        </label>
        <label
          className="formParams__item"
          htmlFor="itemId"
        >
          Item Size:
          <input
            id="itemId"
            className="formParams__input"
            type="number"
            step="10"
            min="10"
            name={InputName.ITEM}
            value={itemWidth}
            onChange={handleChange}
          />
        </label>
        <label
          className="formParams__item"
          htmlFor="animationId"
        >
          Animation Duration:
          <input
            id="animationId"
            className="formParams__input"
            type="number"
            step="100"
            min="100"
            name={InputName.ANIMATION}
            value={animationDuration}
            onChange={handleChange}
          />
        </label>
        <label
          className="formParams__item"
          htmlFor="infiniteId"
        >
          Infinite:
          <input
            id="infiniteId"
            className="formParams__input"
            type="checkbox"
            name={InputName.INFINITE}
            checked={infinite}
            onChange={handleChange}
          />
        </label>

      </fieldset>
    </form>
  );
};
