import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

const creatingList = (array,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  currentPoint) => {
  return !infinite
    ? array.map((image, index) => {
      if (index >= currentPoint && index < currentPoint + frameSize) {
        return (
          <li key={image}>
            <img
              src={image}
              alt={array.indexOf(image)}
              height={`${itemWidth}px`}
            />
          </li>
        );
      }

      return null;
    })
    : array.map((image, index) => {
      if (index < frameSize) {
        return (
          <li key={image}>
            <img
              src={image}
              alt={array.indexOf(image)}
              height={`${itemWidth}px`}
            />
          </li>
        );
      }

      return null;
    });
};

class Carousel extends React.Component {
  state = {
    currentPoint: 0,
  }

  render() {
    const { images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      changeArrayNext,
      changeArrayPrev } = this.props;
    const { currentPoint } = this.state;

    return (
      <div className="Carousel">
        <ul className="Carousel__list">
          {creatingList(images,
            frameSize,
            itemWidth,
            animationDuration,
            infinite,
            currentPoint)}
        </ul>
        <button
          type="button"
          onClick={() => {
            if (infinite) {
              changeArrayPrev(step);
            } else {
              this.setState((state) => {
                let nextPoint = state.currentPoint - step;

                if (!infinite && nextPoint - frameSize <= 0) {
                  nextPoint = 0;
                }

                return {
                  currentPoint: nextPoint,
                };
              });
            }
          }}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => {
            if (infinite) {
              changeArrayNext(step);
            } else {
              this.setState((state) => {
                let nextPoint = state.currentPoint + step;

                if (nextPoint + frameSize >= images.length) {
                  nextPoint = images.length - frameSize;
                }

                return {
                  currentPoint: nextPoint,
                };
              });
            }
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  changeArrayNext: PropTypes.func.isRequired,
  changeArrayPrev: PropTypes.func.isRequired,
};

export default Carousel;
