import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';
import { CarouselSettings } from './CarouselSettings';

class Carousel extends React.Component {
  state = {
    images: this.props.images,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    duration: 1000,
    infinite: false,
    position: 0,
  }

  change = (e, id) => {
    const { target } = e;

    this.setState((state) => {
      let { frameSize, step, itemWidth, duration, infinite } = state;

      switch (id) {
        case 'frameSize':
          frameSize = target.value;
          break;
        case 'step':
          step = target.value;
          break;
        case 'itemWidth':
          itemWidth = target.value;
          break;
        case 'duration':
          duration = target.value;
          break;
        default:
          infinite = target.checked;
      }

      return ({
        images: state.images,
        frameSize,
        step,
        itemWidth,
        duration,
        infinite,
      });
    });
  }

  move = (e) => {
    const { target } = e;

    this.setState((state) => {
      const { position, itemWidth, step, infinite, images, frameSize } = state;
      let currPosition = position;

      if (target.textContent === '⇨') {
        currPosition -= itemWidth * step;

        if (infinite && position === -itemWidth * (images.length - step)) {
          return ({
            position: 0,
          });
        }

        currPosition = Math.max(
          currPosition, -itemWidth * (images.length - frameSize),
        );
      }

      if (target.textContent === '⇦') {
        currPosition += itemWidth * step;
        currPosition = Math.min(currPosition, 0);

        if (infinite && position === 0) {
          return ({
            position: -itemWidth * (images.length - step),
          });
        }
      }

      return ({
        position: currPosition,
      });
    });
  }

  render() {
    const { frameSize, itemWidth, duration, images } = this.state;

    return (
      <>
        <div className="Carousel">
          <button type="button" onClick={e => this.move(e)}>⇦</button>
          <div
            className="Carusel__list"
            style={{ width: `${itemWidth * frameSize}px` }}
          >
            <ul
              className="images"
              style={{
                width: `${itemWidth * images.length}px`,
                transition: `transform ${duration}ms`,
                transform: `translateX(${this.state.position}px)`,
              }}
            >
              {images.map((img, index) => (
                <li
                  key={img}
                >
                  <img
                    style={{ width: `${itemWidth}px` }}
                    src={img}
                    alt={index}
                  />
                </li>
              ))}
            </ul>
          </div>

          <button type="button" onClick={e => this.move(e)}>⇨</button>
        </div>

        <div className="settings">
          <CarouselSettings change={this.change} {...this.state} />
        </div>

      </>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
