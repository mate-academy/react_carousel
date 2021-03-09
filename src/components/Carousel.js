import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

export class Carousel extends React.Component {
  state = {
    transform: 0,
  }

  showNext = () => {
    const { images, step, itemWidth, frameSize } = this.props;
    const scroll = itemWidth * step;
    const maxLength = (images.length - frameSize) * itemWidth;

    this.setState(state => ({
      transform: state.transform - scroll < -maxLength
        ? -maxLength
        : state.transform - scroll,
    }));
  }

  showPrevious = () => {
    const { step, itemWidth } = this.props;
    const scroll = itemWidth * step;

    this.setState(state => ({
      transform: state.transform + scroll > 0 ? 0 : state.transform + scroll,
    }));
  }

  render() {
    const { images, itemWidth, frameSize, animationDuration } = this.props;

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${this.state.transform}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {
            images.map((image, index) => (
              <li
                key={image}
                style={{ width: `${itemWidth}px` }}
              >
                <img src={image} alt={index} />
              </li>
            ))}
        </ul>
        <div className="Carousel__buttons">
          <button type="button" onClick={this.showPrevious}>
            Prev
          </button>
          <button type="button" onClick={this.showNext}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  step: PropTypes.number,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number,
  animationDuration: PropTypes.number,
};

Carousel.defaultProps = {
  step: 3,
  frameSize: 3,
  animationDuration: 1000,
};
