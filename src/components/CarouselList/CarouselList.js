import React from 'react';
import './CarouselList.css';
import PropTypes from 'prop-types';

export const CarouselList = (props) => {
  const { images, itemWidth, translate, animationDuration } = props;

  return (
    <ul
      className="carousel-list"
      style={{
        transform: `translateX(-${translate}px)`,
        transition: `${animationDuration}ms`,
      }}
    >
      {
        images.map((src, index) => (
          <li key={src}>
            <img src={src} alt={index} style={{ width: `${itemWidth}px` }} />
          </li>
        ))
      }
    </ul>
  );
};

CarouselList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  itemWidth: PropTypes.number.isRequired,
  translate: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};
