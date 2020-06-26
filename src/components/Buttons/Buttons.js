import React from 'react';
import { ButtonsShape } from '../../shapes';

export const Buttons = (props) => {
  const { prevSlide, nextSlide } = props;

  return (
    <>
      <button type="button" onClick={prevSlide}>Prev</button>
      <button type="button" onClick={nextSlide}>Next</button>
    </>
  );
};

Buttons.propTypes = ButtonsShape.isRequired;
