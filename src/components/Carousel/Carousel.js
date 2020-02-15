import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';
import { Slide } from '../Slide/Slide';
import { Direction } from './const';

export class Carousel extends React.Component {
  state = {
    marginLeft: 0,
  };

  getMinMarginLeft = () => {
    const { images, step, itemWidth } = this.props;

    return -(images.length * itemWidth - itemWidth * step);
  };

  getNewMarginLeft = (direction) => {
    const { marginLeft } = this.state;
    const { step, itemWidth } = this.props;

    return direction === Direction.NEXT ? (
      marginLeft - step * itemWidth
    ) : (
      marginLeft + step * itemWidth
    );
  };

  handleNextButtonClick = () => {
    const minMarginLeft = this.getMinMarginLeft();
    let newMarginLeft = this.getNewMarginLeft(Direction.NEXT);

    if (newMarginLeft < minMarginLeft) {
      newMarginLeft = minMarginLeft;
    }

    this.setState({
      marginLeft: newMarginLeft,
    });
  };

  handlePrevButtonClick = () => {
    const maxMarginLeft = 0;
    let newMarginLeft = this.getNewMarginLeft(Direction.PREV);

    if (newMarginLeft > maxMarginLeft) {
      newMarginLeft = maxMarginLeft;
    }

    this.setState({
      marginLeft: newMarginLeft,
    });
  };

  render() {
    const { marginLeft } = this.state;
    const { images, animationDuration, frameSize, itemWidth } = this.props;

    const carouselWidth = frameSize * itemWidth;
    const maxMarginLeft = 0;

    return (
      <div
        className="Carousel"
        style={{ width: carouselWidth }}
      >
        <ul
          className="Carousel__list"
          style={{
            marginLeft: `${marginLeft}px`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <Slide key={image} image={image} />
          ))}
        </ul>

        <div className="Controls">
          <button
            className="Controls__btn"
            type="button"
            onClick={this.handlePrevButtonClick}
            disabled={marginLeft === maxMarginLeft}
          >
            Prev
          </button>
          <button
            className="Controls__btn"
            type="button"
            onClick={this.handleNextButtonClick}
            disabled={marginLeft === this.getMinMarginLeft()}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

Carousel.defaultProps = {
  images: [],
};
