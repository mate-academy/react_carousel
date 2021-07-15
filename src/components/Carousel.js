import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    scrollLeft: 0,
    carouselWidth: 1300,
  }

  showedLast = false;

  showedFirst = false;

  next = () => {
    const { itemWidth, frameSize, infinite, step } = this.props;
    const { scrollLeft, carouselWidth } = this.state;
    const maxScrollBy = carouselWidth - (itemWidth * frameSize);
    let scrollBy = scrollLeft + (itemWidth * step);

    if (scrollBy > maxScrollBy) {
      scrollBy = maxScrollBy;

      if (infinite) {
        if (this.showedLast || (scrollLeft === maxScrollBy)) {
          scrollBy = 0;
          this.showedLast = false;
        } else {
          this.showedLast = true;
        }
      }
    }

    this.setState({
      scrollLeft: scrollBy,
    });
  }

  prev = () => {
    const { itemWidth, infinite, step, frameSize } = this.props;
    const { scrollLeft, carouselWidth } = this.state;
    let scrollBy = scrollLeft - (itemWidth * step);

    if (scrollBy < 0) {
      scrollBy = 0;

      if (infinite) {
        if (this.showedFirst || (scrollLeft === 0)) {
          scrollBy = carouselWidth - -(scrollLeft - (itemWidth * frameSize));
          this.showedFirst = false;
        } else {
          this.showedFirst = true;
        }
      }
    }

    this.setState({
      scrollLeft: scrollBy,
    });
  }

  render() {
    const { itemWidth, frameSize, images, animationDuration } = this.props;
    const { scrollLeft } = this.state;
    const carouselStyle = {
      width: `${itemWidth * frameSize}px`,
      height: `${itemWidth}px`,
      overflow: `hidden`,
    };
    const carouselListStyle = {
      transform: `translateX(-${scrollLeft}px)`,
      transitionDuration: `${animationDuration}ms`,
    };
    const imageStyle = {
      height: `${itemWidth}px`,
      width: `${itemWidth}px`,
    };

    return (
      <>
        <div
          className="Carousel"
        >
          <ul
            className="Carousel__list"
            style={carouselStyle}
          >
            <div
              className="Carousel__list-scroll"
              style={carouselListStyle}
            >
              {images.map(image => (
                <li key={image}>
                  <img
                    src={image}
                    alt={image}
                    style={imageStyle}
                  />
                </li>
              ))}
            </div>
          </ul>
        </div>
        <button
          type="button"
          onClick={this.prev}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.next}
        >
          Next
        </button>
      </>
    );
  }
}

Carousel.propTypes = {
  step: PropTypes.number,
  itemWidth: PropTypes.number,
  frameSize: PropTypes.number,
  animationDuration: PropTypes.number,
  infinite: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Carousel.defaultProps = {
  step: 3,
  itemWidth: 130,
  frameSize: 3,
  animationDuration: 1000,
  infinite: false,
};

export default Carousel;
