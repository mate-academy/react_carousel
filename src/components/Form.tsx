import React from 'react';
import './Form.scss';

type Props = {
  stepSize: (step: number) => void;
  frameSize: (size: number) => void;
  imageSize: (width: number) => void;
  animationDuration: (width: number) => void;
  infinite: (result: boolean) => void;
};

const Form: React.FC<Props> = ({
  stepSize,
  frameSize,
  imageSize,
  animationDuration,
  infinite,
}) => {
  return (
    <>
      <div className="Form">
        <label htmlFor="stepId" className="Form__label">
          {' '}
          <input
            id="stepId"
            className="Form__input"
            type="text"
            placeholder="step size"
            onChange={e => stepSize(+e.target.value)}
          />
        </label>

        <label htmlFor="frameId" className="Form__label">
          {' '}
          <input
            id="frameId"
            className="Form__input"
            type="text"
            placeholder="frame size"
            onChange={e => frameSize(+e.target.value)}
          />
        </label>

        <label htmlFor="itemId" className="Form__label">
          {' '}
          <input
            id="itemId"
            className="Form__input"
            type="text"
            placeholder="image size"
            onChange={e => imageSize(+e.target.value)}
          />
        </label>

        <label htmlFor="fnimationDuration" className="Form__label">
          {' '}
          <input
            id="fnimationDuration"
            className="Form__input"
            type="text"
            placeholder="animation duration"
            onChange={e => animationDuration(+e.target.value)}
          />
        </label>

        <label htmlFor="animation" className="Form__label">
          {' '}
          <input
            id="animation"
            className="Form__input"
            type="checkbox"
            placeholder="animation duration"
            onChange={e => infinite(e.target.checked)}
          />
        </label>
      </div>
    </>
  );
};

export default Form;
