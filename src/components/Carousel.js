import React from 'react';
import PropTypes from 'prop-types';

class Carousel extends React.Component {
  state={
    itemIndex: 0,
  }

  moveToNext = () => {
    const { images, infinite, frameSize, step } = this.props;
    const { itemIndex } = this.state;
    let newItemIndex = 0;

    if (infinite) {
      if (itemIndex + frameSize === images.length) {
        newItemIndex = 0;
      } else if (itemIndex + frameSize > images.length - step) {
        newItemIndex = images.length - frameSize;
      } else {
        newItemIndex = itemIndex + step;
      }

      this.setState(state => ({
        itemIndex: newItemIndex,
      }));
    }

    if (!infinite) {
      if (itemIndex + frameSize > images.length - step) {
        newItemIndex = images.length - frameSize;
      } else {
        newItemIndex = itemIndex + step;
      }

      this.setState(state => ({
        itemIndex: newItemIndex,
      }));
    }
  }

  moveToPrev = () => {
    const { images, infinite, step, frameSize } = this.props;
    const { itemIndex } = this.state;
    let newItemIndex = 0;

    if (infinite) {
      if (itemIndex === 0) {
        newItemIndex = images.length - frameSize;
      } else if (itemIndex < step) {
        newItemIndex = 0;
      } else {
        newItemIndex = itemIndex - step;
      }

      this.setState(state => ({
        itemIndex: newItemIndex,
      }));
    }

    if (!infinite) {
      if (itemIndex < step) {
        newItemIndex = 0;
      } else if (itemIndex === 0) {
        newItemIndex = 0;
      } else {
        newItemIndex = itemIndex - step;
      }

      this.setState(state => ({
        itemIndex: newItemIndex,
      }));
    }
  }

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <div
        className="carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="carousel__list"
          style={{
            transform: `translateX(-${this.state.itemIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, ind) => (
            <li
              key={image}
            >
              <img src={image} alt={ind} />
            </li>
          ))}
        </ul>
        <div className="carousel__control">
          <button
            onClick={this.moveToPrev}
            type="button"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={this.moveToNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf.isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
};

export default Carousel;
