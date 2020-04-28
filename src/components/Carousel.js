import React from 'react';
import './Carousel.scss';
import PropTypes, { string } from 'prop-types';
import Buttons from './Button';

class Carousel extends React.Component {
  state = {
    left: 0,
    count: this.props.frameSize,
  }

  swipe = (flow) => {
    const { images, itemWidth, frameSize, infinite, step } = this.props;
    const { left, count } = this.state;
    let toLeft = 0;
    let updateCount = 0;

    if (count + step > images.length && flow === -1) {
      toLeft = (count === images.length && infinite)
        ? 0
        : (images.length % count) * itemWidth * flow + left;
      updateCount = (infinite && count === images.length)
        ? frameSize
        : images.length;
    } else if (flow === 1 && count < frameSize + step) {
      if (count > step && count !== frameSize) {
        toLeft = (count % frameSize) * itemWidth + left * flow;
        updateCount = frameSize;
      } else {
        toLeft = (infinite && count === frameSize)
          ? (images.length - frameSize) * itemWidth * -flow
          : left;
        updateCount = (infinite && count === frameSize)
          ? images.length
          : frameSize;
      }
    } else {
      toLeft = itemWidth * step * flow + left;
      updateCount = (flow === 1) ? count - step : count + step;
    }

    this.setState(() => ({
      left: toLeft, count: updateCount,
    }));
  }

  applyChange = () => {
    this.setState(() => ({
      count: this.props.frameSize,
      left: 0,
    }));
  }

  render() {
    const { images, itemWidth, frameSize, animationDuration } = this.props;
    const { left } = this.state;
    const carouselSize = itemWidth * frameSize;
    const transitionDuration = animationDuration / 1000;

    return (
      <>
        <div className="wrap__apply">
          <p><strong>Click apply after change parameters!</strong></p>
          <p>
            (Иначе первый слайд до конца поломается,
            <br />
            а потом станет нормальный)
          </p>
          <button
            type="button"
            onClick={this.applyChange}
            className="button__apply"
          >
            Apply
          </button>
        </div>
        <div
          className="Carousel"
          style={{
            width: `${carouselSize}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translate(${left}px)`,
              transition: `all ${transitionDuration}s`,
            }}
          >
            {images.map((link, index) => {
              const id = index + 1;

              return (
                <li key={id}>
                  <img
                    style={{
                      width: `${itemWidth}px`,
                    }}
                    src={link}
                    alt={id}
                  />
                </li>
              );
            })}
          </ul>

          <Buttons swipe={this.swipe} />
        </div>
      </>
    );
  }
}

Carousel.propTypes = {
  step: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  frameSize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;
