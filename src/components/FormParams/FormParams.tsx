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
        <label className="formParams__item">
          Step:
          <input
            className="formParams__input"
            type="number"
            name={InputName.STEP}
            value={step}
            onChange={handleChange}
          />
        </label>
        <label className="formParams__item">
          Frame Size:
          <input
            className="formParams__input"
            type="number"
            name={InputName.FRAME}
            value={frameSize}
            onChange={handleChange}
          />
        </label>
        <label className="formParams__item">
          Item Size:
          <input
            className="formParams__input"
            type="number"
            step="10"
            min="10"
            name={InputName.ITEM}
            value={itemWidth}
            onChange={handleChange}
          />
        </label>
        <label className="formParams__item">
          Animation Duration:
          <input
            className="formParams__input"
            type="number"
            step="100"
            min="100"
            name={InputName.ANIMATION}
            value={animationDuration}
            onChange={handleChange}
          />
        </label>
        <label className="formParams__item">
          Infinite:
          <input
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
