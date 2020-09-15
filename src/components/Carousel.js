import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    translate: 0,
  }

  moveRight = () => {
    const { images, itemWidth, step, frameSize, infinite } = this.props;
    const { translate } = this.state;
    const maxPosition = images.length * itemWidth - frameSize * itemWidth;
    let position = translate;

    position -= itemWidth * step;

    if (infinite) {
      const nextItem = images.splice(0, step);

      images.push(...nextItem);
    }

    if (-position > maxPosition && !infinite) {
      position = -maxPosition;
    }

    this.setState({ translate: position });
  };

  moveLeft = () => {
    const { images, itemWidth, step, infinite } = this.props;
    const { translate } = this.state;
    const minPosition = 0;
    let position = translate;

    position += itemWidth * step;

    if (infinite) {
      const prevItem = images.splice(-step);

      images.unshift(...prevItem);
    }

    if (position > minPosition && !infinite) {
      position = minPosition;
    }

    this.setState({ translate: position });
  };

  render() {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      animationDuration,
      infinite,
      changeStep,
      changeWidth,
      changeFrame,
      changeAnimation,
      changeInfinite,
    } = this.props;

    const { translate } = this.state;
    const containerWidth = itemWidth * frameSize;

    return (
      <>
        <div className="section-carousel">
          <div
            className="Carousel"
            style={{
              width: `${containerWidth}px`,
            }}
          >
            <ul
              className="Carousel__list"
              style={{
                transition: `transform ${animationDuration}ms`,
                transform: `translateX(${translate}px)`,
                marginLeft: `${infinite ? -translate - itemWidth * step : 0}px`,
              }}
            >
              {images.map(image => (
                <li key={image}>
                  <img
                    src={image}
                    alt={image}
                    style={{ width: `${itemWidth}px` }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <button
            className="button button--prev"
            type="button"
            onClick={this.moveLeft}
          >
            Prev
          </button>
          <button
            className="button button--next"
            type="button"
            onClick={this.moveRight}
          >
            Next
          </button>
        </div>

        <div className="controllers">
          <div className="item-width">
            <label htmlFor="width">Image width:</label>
            <input
              id="width"
              type="range"
              min="50"
              max="130"
              value={itemWidth}
              onChange={changeWidth}
            />
          </div>
          <div className="step">
            <label htmlFor="step">Step:</label>
            <input
              id="step"
              type="range"
              min="1"
              max="5"
              value={step}
              onChange={changeStep}
            />
          </div>
          <div className="frame">
            <label htmlFor="frame">Frame:</label>
            <input
              id="frame"
              type="range"
              min="1"
              max="5"
              value={frameSize}
              onChange={changeFrame}
            />
          </div>
          <div className="animation">
            <label htmlFor="animation">Animation:</label>
            <input
              id="animation"
              type="range"
              min="0"
              max="3000"
              step="250"
              value={animationDuration}
              onChange={changeAnimation}
            />
          </div>
          <div className="infinite">
            <label htmlFor="infinite">Infinite:</label>
            <input
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={changeInfinite}
            />
            <span className="slider round" />
          </div>
        </div>
      </>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  itemWidth: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  changeStep: PropTypes.func.isRequired,
  changeWidth: PropTypes.func.isRequired,
  changeFrame: PropTypes.func.isRequired,
  changeAnimation: PropTypes.func.isRequired,
  changeInfinite: PropTypes.func.isRequired,
};

Carousel.defaultProps = {
  images: [],
};

export default Carousel;
