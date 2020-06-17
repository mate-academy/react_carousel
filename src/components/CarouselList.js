import React from 'react';
import PropTypes from 'prop-types';

const getId = src => src.match(/(\d+).png/)[1];

const CarouselList = props => (
  <ul
    className="Carousel__list"
    style={{
      transform: `translateX(${-props.translate}px)`,
      transition: `transform ${props.animationDuration}ms`,
    }}
  >
    {
      props.images.map((image, index) => (
        <li key={getId(image)}>
          <img
            src={image}
            alt={index}
            style={{ width: props.width }}
          />
        </li>
      ))
    }
  </ul>
);

export { CarouselList };

CarouselList.propTypes = {
  translate: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  animationDuration: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
