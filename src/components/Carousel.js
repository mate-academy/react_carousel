import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';
import Picture from './Picture';

class Carousel extends React.Component {
  state = {
    left: 0,
  };

  scrollLeft = () => {
    const { images, frameSize, step, itemWidth } = this.props;
    let newPosition = this.state.left;

    newPosition -= itemWidth * step;

    if (Math.abs(newPosition) >= (images.length - frameSize) * itemWidth) {
      newPosition = -(images.length - frameSize) * itemWidth;
    }

    this.setState({
      left: newPosition,
    });
  };

  scrollRight = () => {
    const { itemWidth, step } = this.props;

    let newPosition = this.state.left;

    newPosition += itemWidth * step;

    if (newPosition > 0) {
      newPosition = 0;
    }

    this.setState({
      left: newPosition,
    });
  };

  render() {
    const { frameSize, itemWidth, animationDuration } = this.props;

    const carouselStyle = {
      width: itemWidth * frameSize,
      transition: animationDuration,
    };

    const carouselListStyle = {
      transform: `translateX(${this.state.left}px)`,
      transitionDuration: `${animationDuration}ms`,
    };

    return (
      <>
        <div className="Carousel" style={carouselStyle}>
          <ul className="Carousel__list" style={carouselListStyle}>
            {
              this.props.images.map(image => (
                <li key={image}>
                  <Picture image={image} width={itemWidth} />
                </li>
              ))
            }
          </ul>
        </div>
        <button
          type="button"
          onClick={this.scrollRight}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.scrollLeft}
        >
          Next
        </button>
      </>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;
