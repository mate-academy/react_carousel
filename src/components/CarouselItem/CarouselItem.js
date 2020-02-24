import React from 'react';
import PropTypes from 'prop-types';

export const CarouselItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { url, alt, width } = props;

  return (
    <li
      className="Carousel__item"
      style={{
        width: `${width}px`,
      }}
    >
      <img className="Carousel__img" src={url} alt={alt} />
    </li>
  );
};

CarouselItem.prototype = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};
