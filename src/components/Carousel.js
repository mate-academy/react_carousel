/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

const Carousel = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [transform, changeTransform] = useState(0);

  const width = itemWidth * step;

  const maxSize = images.length * itemWidth;

  const checkInfinite = (n) => {
    switch (n) {
      case 0:
        return infinite
          ? changeTransform(-maxSize + itemWidth)
          : changeTransform(n);
      case -maxSize:
        return infinite
          ? changeTransform(0)
          : changeTransform(n);
      default:
        return n;
    }
  };

  const handleCarousel = (side) => {
    switch (side) {
      case 'left':
        return transform + 390 > 0
          ? checkInfinite(0)
          : changeTransform(transform + 390);
      case 'right':
        return transform - 390 < -maxSize
          ? checkInfinite(-maxSize)
          : changeTransform(transform - 390);
      default:
        return 0;
    }
  };

  return (
    <>
      <button
        type="button"
        className="button button--left"
        onClick={() => handleCarousel('left')}
      />
      <section
        className="carousel"
        style={{
          width,
        }}
      >
        <div
          className="carousel__photos"
          style={{
            transform: `translate(${transform}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((img, index) => (
            <img
              className="image"
              src={img}
              alt={index}
              style={{
                width: `${itemWidth}px)`,
              }}
            />
          ))}
        </div>
      </section>
      <button
        type="button"
        className="button button--right"
        onClick={() => handleCarousel('right')}
      />
    </>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf.isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
};

export default Carousel;
