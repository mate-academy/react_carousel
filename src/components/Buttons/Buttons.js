import React from 'react';
import { ButtonsTypes } from '../Shape/propTypes';

export const Buttons = (props) => {
  const {
    onNext,
    onPrev,
  } = props;

  return (
    <div className="btn__wrapper">
      <button
        type="button"
        onClick={onPrev}
        className="btn btn-secondary"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={onNext}
        className="btn btn-secondary"
      >
        Next
      </button>
    </div>
  );
};

Buttons.propTypes = ButtonsTypes;
