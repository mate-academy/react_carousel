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

  change = (e) => {
    const { value, id } = e.target;

    this.setState({
      [id]: value,
    });
  }

  moveRight = () => {
    const {
      position,
      itemWidth,
      step,
      infinite,
      images,
      frameSize,
    } = this.state;
    let currPosition = position;

    currPosition -= itemWidth * step;
    currPosition = Math.max(
      currPosition, -itemWidth * (images.length - frameSize),
    );

    if (infinite && position === -itemWidth * (images.length - step)) {
      currPosition = 0;
    }

    this.setState({
      position: currPosition,
    });
  }

  moveLeft = () => {
    const { position, itemWidth, step, infinite, images } = this.state;
    let currPosition = position;

    currPosition += itemWidth * step;
    currPosition = Math.min(currPosition, 0);

    if (infinite && position === 0) {
      currPosition = -itemWidth * (images.length - step);
    }

    this.setState({
      position: currPosition,
    });
  }

  render() {
    const { frameSize, itemWidth, duration, images } = this.state;

    return (
      <>
        <div className="Carousel">
          <button type="button" onClick={this.moveLeft}>
            ⇦
          </button>
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

          <button type="button" onClick={this.moveRight}>
            ⇨
          </button>
        </div>

        <div className="settings">
          <CarouselSettings
            change={this.change}
            {...this.state}
          />
        </div>

      </>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
