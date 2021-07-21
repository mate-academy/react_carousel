import React from 'react';
import PropTypes from 'prop-types';

import { carouselPropTypees } from './proptypes';

export const FormCarousel = (
  {
    state,
    changeState,
    changeStateItemWidth,
    changeStateInfinite,
  },
) => (
  <form className="form">
    <label>
      <span className="form__current-value">
        {`FrameSize: ${state.frameSize}`}
      </span>
      <br />
      1
      <input
        type="range"
        defaultValue={state.frameSize}
        min="1"
        max="7"
        onChange={event => (changeState(event, 'frameSize'))}
      />
      7
    </label>
    <label>
      <span className="form__current-value">
        {`Step: ${state.step}`}
      </span>
      <br />
      1
      <input
        type="range"
        defaultValue={state.step}
        min="1"
        max="5"
        onChange={event => (changeState(event, 'step'))}
      />
      5
    </label>
    <label>
      <span className="form__current-value">
        {`Item width: ${state.itemWidth}`}
      </span>
      <br />
      100
      <input
        type="range"
        defaultValue={state.itemWidth}
        min="100"
        max="200"
        step="10"
        onChange={event => (changeStateItemWidth(event))}
      />
      200
    </label>
    <label>
      <span className="form__current-value">
        {`Animation Duration: ${state.animationDuration}`}
      </span>
      <br />
      500
      <input
        type="range"
        defaultValue={state.animationDuration}
        min="500"
        max="5000"
        step="100"
        onChange={event => (changeState(event, 'animationDuration'))}
      />
      5000
    </label>
    <label>
      Infinite:
      <input
        type="checkbox"
        onChange={changeStateInfinite}
      />
    </label>
  </form>
);

FormCarousel.propTypes = {
  state: PropTypes.shape(
    carouselPropTypees,
  ).isRequired,
  changeState: PropTypes.func.isRequired,
  changeStateItemWidth: PropTypes.func.isRequired,
  changeStateInfinite: PropTypes.func.isRequired,
};
