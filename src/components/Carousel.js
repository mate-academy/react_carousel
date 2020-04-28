import React from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ images,
  step,
  frameSize,
  itemWidth,
  animationDuration }) => {
  function moveRight(event) {
    let { left } = event.nativeEvent.srcElement.parentElement.children[0].style;
    const carouselElement = event
      .nativeEvent
      .srcElement
      .parentElement
      .children[0];

    left = (parseInt(left, 10)) ? parseInt(left, 10) : 0;
    if (left + step * itemWidth > 0) {
      carouselElement.style.left = `${0}px`;
    } else {
      carouselElement.style.left = `${left + step * itemWidth}px`;
    }
  }

  function moveLeft(event) {
    let { left } = event.nativeEvent.srcElement.parentElement.children[0].style;
    const carouselElement = event
      .nativeEvent
      .srcElement
      .parentElement
      .children[0];

    left = (parseInt(left, 10)) ? parseInt(left, 10) : 0;
    if (left - step * itemWidth < -(images.length - step) * itemWidth) {
      carouselElement
        .style.left = `${-(itemWidth * images.length - step * itemWidth)}px`;
    } else {
      carouselElement.style.left = `${left - step * itemWidth}px`;
    }
  }

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{ transition: `${animationDuration / 1000}s` }}
      >
        {images.map((image, index) => (
          <li
            key={image}
            className="Carousel__item"
            style={{ width: `${itemWidth}px` }}
          >
            <img src={image} alt={index} />
          </li>
        ))}
      </ul>

      <button onClick={moveRight} type="button">Prev</button>
      <button onClick={moveLeft} type="button">Next</button>

    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;
