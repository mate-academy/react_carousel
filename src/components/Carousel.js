import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarouselList from './CarouselList';

class Carousel extends Component {
  state = { translation: 0 }

  switchPrevImages = () => {
    const { step, itemWidth } = this.props;

    this.setState((prevState) => {
      let position = prevState.translation;

      position += itemWidth * step;
      position = Math.min(0, position);

      return { translation: position };
    });
  };

  switchNextImages = () => {
    const { step, images, itemWidth } = this.props;

    this.setState((prevState) => {
      let position = prevState.translation;

      position -= itemWidth * step;
      position = Math.max(position, -itemWidth * (images.length - step));

      return { translation: position };
    });
  };

  render = () => {
    const {
      images,
      frameSize,
      itemWidth,
      arrowSize,
      animationDuration,
    } = this.props;
    const { translation } = this.state;

    return (
      <div
        className="carousel"
        style={{ width: frameSize * itemWidth }}
      >
        <button
          type="button"
          className="carousel__arrow carousel__arrow--prev"
          style={{
            width: arrowSize,
            height: arrowSize,
            top: itemWidth / 2 - arrowSize / 2,
            borderRadius: itemWidth / 2,
          }}
          onClick={this.switchPrevImages}
        >
          {`<`}
        </button>

        <div className="carousel__container">
          <CarouselList
            images={images}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            translation={translation}
          />
        </div>

        <button
          type="button"
          className="carousel__arrow carousel__arrow--next"
          style={{
            width: arrowSize,
            height: arrowSize,
            top: itemWidth / 2 - arrowSize / 2,
            borderRadius: itemWidth / 2,
          }}
          onClick={this.switchNextImages}
        >
          {`>`}
        </button>
      </div>
    );
  };
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  arrowSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;
