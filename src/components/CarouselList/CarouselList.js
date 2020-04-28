import React from 'react';
import PropTypes from 'prop-types';

import './CarouselList.css';

export const CarouselList = ({
  animationDuration, images, itemWidth, marginLeft,
}) => (
  <ul
    className="Carousel__list"
    style={{
      transitionDuration: `${animationDuration / 1000}s`,
      marginLeft: `-${marginLeft}px`,
    }}
  >

    {images.map((link) => {
      const idImg = /\d+/.exec(link);

      return (
        <li key={idImg}>
          <img
            style={{ width: `${itemWidth}px` }}
            src={link}
            alt={idImg}
          />
        </li>
      );
    })}

  </ul>
);

CarouselList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
};
