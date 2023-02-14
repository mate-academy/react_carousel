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
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);

  const prevShift = shift + step;
  const nextShift = shift - step;

  useEffect(() => {
    setIsNext(false);
    setIsPrev(false);
  }, [step, frameSize, infinite]);

  const handleButtonClick = (translate: number) => {
    const maxShift = (images.length - frameSize) * -1;
    const minShift = 0;
    const isFirstItem = infinite && shift === minShift && translate > minShift;
    const isLastItem = infinite && shift === maxShift && translate < maxShift;

    if (translate < minShift || translate > maxShift) {
      setIsNext(false);
      setIsPrev(false);
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
        setIsPrev(true);
      }

      return;
    }

    if (translate <= maxShift) {
      dispatch(setShift(maxShift));

      if (!infinite) {
        setIsNext(true);
      }

      return;
    }

    dispatch(setShift(translate));
  };

  return (
    <div className="carousel__button">
      <button
        type="button"
        disabled={isPrev}
        onClick={() => handleButtonClick(prevShift)}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        disabled={isNext}
        onClick={() => handleButtonClick(nextShift)}
      >
        Next
      </button>
    </div>
  );
};
