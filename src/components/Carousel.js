import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

const creatingList = (
  array,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  currentPoint,
) => {
  // eslint-disable-next-line arrow-body-style
  const createCheck = (index) => {
    return infinite
      ? index < frameSize
      : index >= currentPoint && index < currentPoint + frameSize;
  };

  return array.map((image, index) => {
    if (createCheck(index)) {
      return (
        <li key={image}>
          <img
            src={image}
            alt={array.indexOf(image)}
            height={`${itemWidth}px`}
          />
        </li>
      );
    }

    return null;
  });
};

const Carousel = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  changeArrayNext,
  changeArrayPrev,
  setPointNext,
  setPointPrev,
  currentPoint,
}) => (
  <div className="Carousel">
    <ul className="Carousel__list">
      {creatingList(images,
        frameSize,
        itemWidth,
        animationDuration,
        infinite,
        currentPoint)}
    </ul>
    <button
      type="button"
      onClick={() => {
        if (infinite) {
          changeArrayPrev(step);
        } else {
          setPointPrev();
        }
      }}
    >
      Prev
    </button>
    <button
      type="button"
      onClick={() => {
        if (infinite) {
          changeArrayNext(step);
        } else {
          setPointNext();
        }
      }}
    >
      Next
    </button>
  </div>
);

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  changeArrayNext: PropTypes.func.isRequired,
  changeArrayPrev: PropTypes.func.isRequired,
  setPointNext: PropTypes.func.isRequired,
  setPointPrev: PropTypes.func.isRequired,
  currentPoint: PropTypes.number.isRequired,
};

export default Carousel;
