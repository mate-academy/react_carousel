import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarouselList from './CarouselList';
import Button from './Button';

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
    const { images, frameSize, itemWidth, duration } = this.props;
    const { translation } = this.state;

    return (
      <div
        className="carousel"
        style={{ width: frameSize * itemWidth }}
      >
        <Button
          buttonClickHandler={this.switchPrevImages}
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
          buttonClickHandler={this.switchNextImages}
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
  frameSize: PropTypes.number.isRequired,
  arrowSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Carousel;
