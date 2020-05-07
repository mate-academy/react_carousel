import React from 'react';
import PropTypes from 'prop-types';

const Carousel = ({
  frameSize,
  itemWidth,
  animationDuration,
  swipeImages,
  position,
  images,
}) => (
  <div className="carousel">
    <button
      type="button"
      onClick={() => swipeImages('prev')}
    >
      <img
        src="./img/prev.png"
        width="10px"
        height="10px"
        alt="next arrow"
      />
    </button>
    <div
      className="container"
      style={{ width: `${frameSize * itemWidth}px` }}
    >
      <ul
        className="carousel__list"
        style={{
          transform: `translateX(${position}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((url) => {
          const imgId = /\d+/.exec(url);

          return (
            <li key={imgId}>
              <img
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
                src={url}
                alt={imgId}
              />
            </li>
          );
        })}
      </ul>
    </div>
    <button
      type="button"
      onClick={() => swipeImages('next')}
    >
      <img
        src="./img/next.png"
        width="10px"
        height="10px"
        alt="next arrow"
      />
    </button>
  </div>
);

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  swipeImages: PropTypes.func.isRequired,
};
