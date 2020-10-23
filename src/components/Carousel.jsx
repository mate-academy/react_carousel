import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

export const Carousel = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  currentPosition,
}) => {
  const containerWidth = itemWidth * frameSize;

  return (
    <div className="Carousel__section">
      <div
        className="Carousel"
        style={{
          width: `${containerWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms`,
            transform: `translateX(${currentPosition}px)`,
            marginLeft: `${infinite
              ? (-currentPosition - itemWidth * step)
              : 0}px`,
          }}
        >
          {images.map(image => (
            <li key={image}>
              <img
                src={image}
                alt={image}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  currentPosition: PropTypes.number.isRequired,

};
