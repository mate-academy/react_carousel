import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MIN_ITEM_WIDTH = 30;
const MAX_ITEM_WIDTH = 130;

const Form = ({
  itemWidth,
  frameSize,
  step,
  isInfinite,
  applyItemWidth,
  resetItemWidth,
  applyFrameSize,
  applyStep,
  resetAll,
  toggleInfinityMode,
  inputWidthValue,
}) => {
  const [isAddDisabled, disableAdd] = useState(true);

  return (
    <form className="form" onSubmit={event => event.preventDefault()}>
      <label htmlFor="itemWidth">
        Enter preferred width of each item in pixels (30 - 130)
        <br />
        <input
          id="itemWidth"
          type="number"
          placeholder="130"
          min={MIN_ITEM_WIDTH}
          max={MAX_ITEM_WIDTH}
          ref={inputWidthValue}
          onChange={(event) => {
            if (event.target.value >= 30 && event.target.value <= 130) {
              disableAdd(false);
            } else {
              disableAdd(true);
            }
          }}
        />

        <button
          type="button"
          className="form__button"
          disabled={isAddDisabled}
          onClick={() => {
            disableAdd(true);
            applyItemWidth();
          }}
        >
          OK
        </button>

        <button
          type="button"
          className="form__button"
          disabled={itemWidth === 130}
          onClick={resetItemWidth}
        >
          Default
        </button>
      </label>
      <br />

      <label htmlFor="frameSize">
        Choose how many images would you like to display at the same time
        <br />
        <select
          id="frameSize"
          value={frameSize}
          onChange={applyFrameSize}
        >
          {[1, 2, 3, 4, 5].map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <br />

      <label htmlFor="step">
        Choose how many images would you like to scroll per click
        <br />
        <select
          id="step"
          value={step}
          onChange={applyStep}
        >
          {[1, 2, 3, 4, 5].map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <br />

      <button
        type="button"
        className="form__lower-button"
        disabled={itemWidth === 130 && frameSize === 3 && step === 3}
        onClick={resetAll}
      >
        Set all to default
      </button>

      <button
        type="button"
        className="form__lower-button"
        onClick={toggleInfinityMode}
      >
        {isInfinite ? 'Disable' : 'Enable'}
        {' '}
        infinity mode
      </button>
    </form>
  );
};

Form.propTypes = {
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  isInfinite: PropTypes.bool.isRequired,
  applyItemWidth: PropTypes.func.isRequired,
  resetItemWidth: PropTypes.func.isRequired,
  applyFrameSize: PropTypes.func.isRequired,
  applyStep: PropTypes.func.isRequired,
  resetAll: PropTypes.func.isRequired,
  toggleInfinityMode: PropTypes.func.isRequired,
  inputWidthValue: PropTypes.shape({}).isRequired,
};

export default Form;
