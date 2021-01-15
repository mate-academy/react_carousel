import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

const Carousel = ({ images }) => (
  <>
    {images.map((elem, index) => (
      <li
        key={elem + 1}
        className="Carousel__list-element"
      >
        <img
          src={elem}
          alt={index + 1}
          className="Carousel__list-picture"
        />

        <span style={{
          position: 'absolute',
          left: '0',
          top: '0',
        }}
        >
          {index + 1}
        </span>
      </li>
    ))}
  </>
);

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  // width: PropTypes.number.isRequired,
  // count: PropTypes.number.isRequired,
};
