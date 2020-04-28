import React from 'react';
import './Carousel.scss';
import PropTypes, { string } from 'prop-types';
import Buttons from './Button';

class Carousel extends React.Component {
  state = {
    left: 0,
    count: this.props.frameSize,
  }

  prev = () => {
    this.setState((state) => {
      const { step, itemWidth, images, infinite, frameSize } = this.props;

      if (state.left === 0 && !infinite) {
        return;
      }

      if (state.left >= 0 && infinite) {
        const left = (images.length - frameSize) * -itemWidth;
        const count = images.length;

        return {
          left, count,
        };
      }

      if (state.count % step !== 0 && state.count < step * 2) {
        return {
          left: 0, count: step,
        };
      }

      const left = itemWidth * step + state.left;
      const count = state.count - step;

      return {
        left, count,
      };
    });
  }

  next = () => {
    const { step, itemWidth, images, infinite, frameSize } = this.props;

    this.setState((state) => {
      if (state.count === images.length && !infinite) {
        return;
      }

      if (state.count === images.length && infinite) {
        const count = frameSize;

        return {
          left: 0, count,
        };
      }

      if (state.count + step > images.length) {
        const restLeft = images.length % state.count;
        const left = -itemWidth * restLeft + state.left;

        return {
          left, count: images.length,
        };
      }

      const left = -itemWidth * step + state.left;
      const count = state.count + step;

      return {
        left, count,
      };
    });
  }

  render() {
    const { images, itemWidth, frameSize, animationDuration } = this.props;
    const { left } = this.state;
    const carouselSize = itemWidth * frameSize;
    const transitionDuration = animationDuration / 1000;

    console.log(this.state.count, left);
    return (
      <div className="Carousel" style={{ width: `${carouselSize}px` }}>
        <ul
          className="Carousel__list"
          style={{
            left: `${left}px`, transition: `all ${transitionDuration}s`,
          }}
        >
          {images.map((link, index) => {
            const id = index + 1;

            return (
              <li key={id}>
                <img
                  style={{ width: `${itemWidth}px` }}
                  src={link}
                  alt={id}
                />
              </li>
            );
          })}
        </ul>

        <Buttons prev={this.prev} next={this.next} />
      </div>
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
