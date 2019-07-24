import React from 'react';
import PropTypes from 'prop-types';

function Image({
  images,
  itemWidth,
  translateStep,
  animationDuration,
  frameSize,
}) {
  const styleImg = {
    width: itemWidth,
    height: itemWidth,
  };

  const styleList = {
    transform: `translateX(${translateStep}px)`,
    transition: `transform ${animationDuration}ms ease-in-out 0s`,
  };

  const styleContainer = {
    width: itemWidth * frameSize,
  };

  return (
    <div className="Carousel__list-container" style={styleContainer}>
      <ul className="Carousel__list" style={styleList}>
        {images.map((image, i) => (
          <li key={i} className="Carousel__list-item">
            <img
              style={styleImg}
              src={image}
              alt={i + 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

Image.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number,
  translateStep: PropTypes.number.isRequired,
  animationDuration: PropTypes.number,
  frameSize: PropTypes.number.isRequired,
};

Image.defaultProps = {
  itemWidth: 130,
  animationDuration: 1000,
};

export default Image;
