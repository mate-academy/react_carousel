import React from 'react';
import './Carousel.scss';
import PropTypes from 'prop-types';
import CarouselList from './CorouselList';

class Carousel extends React.Component {
  state = {
    translation: 0,
  }

  prevPosition = 0;

  prevScroll = () => {
    const { step, itemWidth, infinite, images, frameSize } = this.props;

    this.setState((prevState) => {
      let position = prevState.translation;
      const startPosition = -itemWidth * (images.length - frameSize);

      position += step * itemWidth;

      position = Math.min(0, position);

      if (infinite) {
        if (this.prevPosition === 0) {
          this.prevPosition = startPosition;

          return { translation: startPosition };
        }
      }

      this.prevPosition = position;

      return { translation: position };
    });
  }

  nextScroll = () => {
    const { step, images, itemWidth, frameSize, infinite } = this.props;

    this.setState((prevState, State, translation) => {
      let position = prevState.translation;

      position -= step * itemWidth;
      position = Math.max(position, -itemWidth * (images.length - frameSize));

      if (infinite) {
        if (this.prevPosition === position) {
          this.prevPosition = 0;

          return { translation: 0 };
        }
      }

      this.prevPosition = position;

      return { translation: position };
    });
  }

  render = () => {
    const {
      images,
      itemWidth,
      animationDuration,
      frameSize,
      infinite,
    } = this.props;

    const { translation } = this.state;
    const quantityPictures = itemWidth * frameSize;

    return (
      <div className="carousel">

        <button
          type="button"
          onClick={this.prevScroll}
        >
          Prev
        </button>

        <div className="carousel__container-wrapper">
          <div
            className="carousel__container-inner"
            style={{
              width: `${quantityPictures}px`,
            }}
          >
            <CarouselList
              images={images}
              translation={translation}
              itemWidth={itemWidth}
              animationDuration={animationDuration}
              frameSize={frameSize}
              infinite={infinite}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={this.nextScroll}
        >
          Next
        </button>
      </div>
    );
  };
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
};

export default Carousel;
