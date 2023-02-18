import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShift } from '../../features/formSlice';

import './Button.scss';

export const Buttons = () => {
  const { images } = useAppSelector(state => state.images);
  const {
    step,
    shift,
    frameSize,
    infinite,
  } = useAppSelector(state => state.form);
  const dispatch = useAppDispatch();
  const [isNextDisabled, IsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);

  const prevShift = shift + step;
  const nextShift = shift - step;

  useEffect(() => {
    IsNextDisabled(false);
    setIsPrevDisabled(false);
  }, [step, frameSize, infinite]);

  const handleButtonClick = (translate: number) => {
    const maxShift = (images.length - frameSize) * -1;
    const minShift = 0;
    const isFirstItem = infinite && shift === minShift && translate > minShift;
    const isLastItem = infinite && shift === maxShift && translate < maxShift;

    if (translate < minShift || translate > maxShift) {
      IsNextDisabled(false);
      setIsPrevDisabled(false);
    }

    if (isFirstItem) {
      dispatch(setShift(maxShift));

      return;
    }

    if (isLastItem) {
      dispatch(setShift(minShift));

      return;
    }

    if (translate >= minShift) {
      dispatch(setShift(minShift));

      if (!infinite) {
        setIsPrevDisabled(true);
      }

      return;
    }

    if (translate <= maxShift) {
      dispatch(setShift(maxShift));

      if (!infinite) {
        IsNextDisabled(true);
      }

      return;
    }

    dispatch(setShift(translate));
  };

  return (
    <div className="carousel__button">
      <button
        type="button"
        disabled={isPrevDisabled}
        onClick={() => handleButtonClick(prevShift)}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        disabled={isNextDisabled}
        onClick={() => handleButtonClick(nextShift)}
      >
        Next
      </button>
    </div>
  );
};
