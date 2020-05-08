import React from 'react';
import './Carousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export class Carousel extends React.Component {
  state = {
    images: this.props.images,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    animationDuration: this.props.animationDuration,
    translateX: 0,
  };

  prevHandler = () => {
    const { step, translateX, itemWidth } = this.state;

    if (translateX + itemWidth * step > 0) {
      this.setState(prevState => (
        {
          translateX: 0,
        }
      ));

      return false;
    }

    this.setState(prevState => ({
      translateX: prevState.translateX + itemWidth * step,
    }));

    return true;
  };

  nextHandler = () => {
    const { images, step, itemWidth, frameSize, translateX } = this.state;

    if ((translateX - itemWidth * step) <= -itemWidth * (images.length - 2)) {
      this.setState(prevState => (
        {
          translateX: -itemWidth * (images.length - frameSize),
        }
      ));

      return false;
    }

    this.setState(prevState => (
      {
        translateX: prevState.translateX - itemWidth * step,
      }
    ));

    return true;
  };

  render() {
    const { images, itemWidth, frameSize } = this.state;

    return (
      <div className="carousel" style={{ width: frameSize * itemWidth }}>
        <div
          className="carousel_slider"
          style={{
            transform: `translateX(${this.state.translateX}px)`,
            transition: `transform ${
              this.state.animationDuration
            }ms ease-in-out`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              style={{ minWidth: itemWidth }}
              alt=""
            />
          ))}
        </div>
        <div className="carousel__button-wrapper">
          <FontAwesomeIcon
            className="carousel__button carousel__button-next"
            icon={faArrowRight}
            onClick={this.nextHandler}
          />
          <FontAwesomeIcon
            className="carousel__button carousel__button-prev"
            icon={faArrowLeft}
            onClick={this.prevHandler}
          />
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number,
  frameSize: PropTypes.number,
  step: PropTypes.number,
  animationDuration: PropTypes.number,
};

Carousel.defaultProps = {
  itemWidth: 130,
  frameSize: 3,
  step: 1,
  animationDuration: 0.4,
};
