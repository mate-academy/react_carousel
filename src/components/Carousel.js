import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarouselList from './CarouselList';

class Carousel extends Component {
  state = { images: [...this.props.images] }

  switchPrevImages = () => {
    const { images } = this.props;
    let { step } = this.props;
    const firstImage = images[0];

    this.setState(prevState => ({
      images: prevState.images.map(
        (img, idx, imgs) => {
          if (firstImage === imgs[0]) {
            return img;
          }

          imgs.forEach((image, i) => {
            if (firstImage === image
              && i >= imgs.length - step
              && i < imgs.length) {
              step = imgs.length - i;
            }
          });

          let newIndex = idx - step;

          if (newIndex < 0) {
            newIndex += imgs.length;
          }

          return imgs[newIndex];
        },
      ),
    }));
  };

  switchNextImages = () => {
    const { images } = this.props;
    let { step } = this.props;
    const lastImage = images[images.length - 1];

    this.setState(prevState => ({
      images: prevState.images.map(
        (img, idx, imgs) => {
          if (lastImage === imgs[step - 1]) {
            return img;
          }

          imgs.forEach((image, i) => {
            if (lastImage === image && i >= step && i < step * 2) {
              step = i - step + 1;
            }
          });

          let newIndex = idx + step;

          if (newIndex > imgs.length - 1) {
            newIndex -= imgs.length;
          }

          return imgs[newIndex];
        },
      ),
    }));
  };

  render = () => {
    const { frameSize, itemWidth, arrowSize } = this.props;
    const { images } = this.state;
    const visibleImages = images.filter(
      (_, index) => index < this.props.frameSize
    );

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

        <CarouselList
          images={visibleImages}
          itemWidth={itemWidth}
        />

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
};

export default Carousel;
