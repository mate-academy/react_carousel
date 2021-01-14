import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

const Carousel = ({ images, width, count }) => (
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
  // <div className="Carousel">
  //   <ul className="Carousel__list">
  //     <li><img src="./img/1.png" alt="1" /></li>
  //     <li><img src="./img/1.png" alt="2" /></li>
  //     <li><img src="./img/1.png" alt="3" /></li>
  //     <li><img src="./img/1.png" alt="4" /></li>
  //   </ul>
  //
  //   <button type="button">Prev</button>
  //   <button type="button">Next</button>
  // </div>
);

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};
