import React from 'react';
import './Carousel.scss';
import PropTypes, { string } from 'prop-types';
import Buttons from './Button';

class Carousel extends React.Component {
  state = {
    left: 0,
    count: this.props.step,
  }

  componentDidMount() {
    const { frameSize, animationDuration, itemWidth } = this.props;
    const carousel = document.querySelector('.Carousel');
    const carouselList = document.querySelector('.Carousel__list');

    carousel.style.width = `${itemWidth * frameSize}px`;
    carouselList.style.transition = `all ${animationDuration / 1000}s`;
    carouselList.style.position = `relative`;
  }

  prev = () => {
    const { step, itemWidth, images, infinite } = this.props;

    this.setState((state) => {
      if (state.left === 0 && !infinite) {
        return;
      }

      if (state.left >= 0 && infinite) {
        const toLast = (images.length - step) * -itemWidth;
        const toLastCount = images.length;

        return {
          left: toLast, count: toLastCount,
        };
      }

      if (state.count % step !== 0 && state.count < step * 2) {
        const toLeft = 0;
        const newCount = state.count = step;

        return {
          left: toLeft, count: newCount,
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
    const { step, itemWidth, images, infinite } = this.props;

    this.setState((state) => {
      if (state.count === images.length && !infinite) {
        return;
      }

      if (state.count === images.length && infinite) {
        const toStart = 0;
        const toStartCount = step;

        return {
          left: toStart, count: toStartCount,
        };
      }

      if (state.count + step > images.length) {
        const restLeft = images.length % state.count;
        const toLeft = -itemWidth * restLeft + state.left;

        return {
          left: toLeft, count: images.length,
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
    const { images, itemWidth } = this.props;
    const { left } = this.state;

    return (
      <div className="Carousel">
        <ul className="Carousel__list" style={{ left: `${left}px` }}>
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
