import React from 'react';
import { ButtonsTypes } from '../Shape/propTypes';

export const Buttons = (props) => {
  const {
    next,
    prev,
  } = props;

  return (
    <div className="btn__wrapper">
      <button
        type="button"
        onClick={prev}
        className="btn btn-secondary"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={next}
        className="btn btn-secondary"
      >
        Next
      </button>
    </div>
  );
};

Buttons.propTypes = ButtonsTypes;
