import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

export class Carousel extends React.PureComponent {
  render() {
    const {
      images,
      step,
      framesize,
      width,
      animation,
      initialPosition,
      next,
    } = this.props;
    // console.log(width);
    const carouselStyle = {
      width: `${width * framesize}px`,
      // transform: `translateX(530px)`,
    };

    const carouselListStyle = {
      width: `${width * framesize}px`,
      transform: `translateX(-${width * initialPosition * step}px)`,
    };

    return (
      <div className="Carousel" style={carouselStyle}>
        <ul className="Carousel__list" style={carouselListStyle}>
          {images.map((image, imgIndex) => (
            <li className="Carousel__item">
              <img src={image} alt={imgIndex} />
            </li>
          ))}
        </ul>

        <button type="button">Prev</button>
        <button type="button" onClick={next}>Next</button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.number.isRequired,
  framesize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  animation: PropTypes.number.isRequired,
};
