import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarouselList from './CarouselList';
import Button from './Button';

class Carousel extends Component {
  state = { translation: 0 }

  switchImages = (sign) => {
    const { step, images, itemWidth, frmSize, infinite } = this.props;

    this.setState((prevState) => {
      let position = prevState.translation;
      const frmWidth = itemWidth * frmSize;
      const carouselWidth = itemWidth * images.length;

      if (sign > 0) {
        if (infinite && position === frmWidth - carouselWidth) {
          position = itemWidth * step;
        }

        position -= itemWidth * step;
        position = Math.max(position, -itemWidth * (images.length - frmSize));
      } else {
        if (infinite && position === 0) {
          position = frmWidth - carouselWidth - (itemWidth * step);
        }

        position += itemWidth * step;
        position = Math.min(0, position);
      }

      return { translation: position };
    });
  };

  render = () => {
    const { images, frmSize, itemWidth, duration } = this.props;
    const { translation } = this.state;

    return (
      <div
        className="carousel"
        style={{ width: frmSize * itemWidth }}
      >
        <Button
          buttonClickHandler={() => this.switchImages(-1)}
          {...this.props}
          arrow="🢦"
        />
        <div className="carousel__container">
          <CarouselList
            images={images}
            itemWidth={itemWidth}
            duration={duration}
            translation={translation}
          />
        </div>
        <Button
          buttonClickHandler={() => this.switchImages(1)}
          {...this.props}
          arrow="🢧"
        />
        <h1 className="main-title">
          {`Carousel with ${images.length} emoji`}
        </h1>
      </div>
    );
  };
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  frmSize: PropTypes.number.isRequired,
  arrowSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
};

export default Carousel;
