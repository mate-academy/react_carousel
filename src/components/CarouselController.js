import React from 'react';
import PropTypes from 'prop-types';
import './CarouselController.scss';

const CarouselController = (props) => {
  const {
    frameWidth,
    step,
    speed,
    imgWidth,
    changeFrameWidth,
    changeStep,
    changeImgWidth,
    changeDuration,
  } = props;

  return (
    <form
      className="CarouselController"
      style={{ paddingTop: `${150 - imgWidth}px` }}
    >
      <label htmlFor="frame-width" className="CarouselController__label">
        <span>Visible images</span>
        <input
          type="range"
          id="frame-width"
          min="1"
          max="10"
          step="1"
          value={frameWidth}
          className="CarouselController__range"
          onChange={changeFrameWidth}
        />
      </label>

      <label htmlFor="step" className="CarouselController__label">
        <span>Step</span>
        <input
          type="range"
          id="step"
          min="1"
          max="9"
          step="1"
          value={step}
          className="CarouselController__range"
          onChange={changeStep}
        />
      </label>

      <label htmlFor="img-width" className="CarouselController__label">
        <span>Image width</span>
        <input
          list="num"
          type="range"
          id="img-width"
          min="50"
          max="150"
          step="1"
          value={imgWidth}
          className="CarouselController__range"
          onChange={changeImgWidth}
        />
      </label>

      <label htmlFor="duration" className="CarouselController__label">
        <span>Transition duration</span>
        <input
          type="range"
          id="duration"
          min="0"
          max="3000"
          value={speed}
          className="CarouselController__range"
          onChange={changeDuration}
        />
      </label>
    </form>
  );
};

CarouselController.propTypes = {
  frameWidth: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
  speed: PropTypes.string.isRequired,
  imgWidth: PropTypes.string.isRequired,
  changeFrameWidth: PropTypes.string.isRequired,
  changeStep: PropTypes.string.isRequired,
  changeImgWidth: PropTypes.string.isRequired,
  changeDuration: PropTypes.string.isRequired,
};

export default CarouselController;
