import React from 'react';
import './Carousel';

interface Props {
  onStep: (step: number) => void;
  onItemWidth: (item: number) => void;
  onFrameSize: (item: number) => void;
}

const Form: React.FC<Props> = ({ onStep, onItemWidth, onFrameSize }) => {
  const stepDefalte = 3;
  const itemWidthDefalte = 130;
  const frameSizeDefalte = 3;

  return (
    <form action="#" className="form">
      <div className="form__item">
        <label htmlFor="stepInput">Enter a step: </label>
        <input
          type="number"
          name="Step"
          id="stepInput"
          onChange={e => {
            const value = +e.target.value;

            if (value && value > 0) {
              onStep(value);
            } else {
              onStep(stepDefalte);
            }
          }}
        />
      </div>
      <div className="form__item">
        <label htmlFor="sizeInput">Enter a size: </label>
        <input
          type="number"
          name="Size"
          id="sizeInput"
          onChange={e => {
            const value = +e.target.value;

            if (value > 0) {
              onFrameSize(value);
            } else {
              onFrameSize(frameSizeDefalte);
            }
          }}
        />
      </div>
      <div className="form__item">
        <label htmlFor="itemWidthInput">Enter a width: </label>
        <input
          type="number"
          name="Width"
          id="itemWidthInput"
          onChange={e => {
            const value = +e.target.value;

            if (value > 0) {
              onItemWidth(value);
            } else {
              onItemWidth(itemWidthDefalte);
            }
          }}
        />
      </div>
    </form>
  );
};

export default Form;
