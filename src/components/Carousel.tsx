import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
};

class Carousel extends React.Component<Props> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    position: 0,
  };

  slideLeft = () => {
    const {
      position,
      step,
      frameSize,
      infinite,
    } = this.state;

    const infiniteLeft = () => {
      if (infinite) {
        if (position !== 0) {
          return 0;
        }

        return -10 + frameSize;
      }

      return 0;
    };

    this.setState({
      position: position + step >= 0
        ? infiniteLeft()
        : position + step,
    });
  };

  slideRight = () => {
    const {
      position,
      step,
      frameSize,
      infinite,
    } = this.state;

    const infiniteRight = () => {
      if (infinite) {
        if (position !== -10 + frameSize) {
          return -10 + frameSize;
        }

        return 0;
      }

      return -10 + frameSize;
    };

    this.setState({
      position: position <= -10 + step + frameSize
        ? infiniteRight()
        : position - step,
    });
  };

  render() {
    const { images } = this.props;
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      position,
    } = this.state;

    return (
      <div
        className="Carousel"
      >
        <div
          className="Carousel__container"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <ul
            className="Carousel__list"
            id="carousel__list"
            style={{
              transition: `transform ${animationDuration}ms`,
              transform: `translateX(${position * itemWidth}px)`,
            }}
          >
            {images.map(img => (
              <li
                key={img}
                className="Carousel__item"
              >
                <img
                  src={img}
                  alt={`${images.indexOf(img) + 1}`}
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div id="buttons">
          <button
            type="button"
            className={`button button__left ${(position === 0 && !infinite) && 'button__inactive'}`}
            onClick={this.slideLeft}
          >
            <img src="./img/left-arrow.svg" alt="Arrow-left" />
          </button>

          <button
            type="button"
            data-cy="next"
            className={`button button__right ${(position === -10 + frameSize && !infinite) && 'button__inactive'}`}
            onClick={this.slideRight}
          >
            <img src="./img/right-arrow.svg" alt="Arrow-right" />
          </button>
        </div>

        <div className="input">
          <label className="input__item" htmlFor="stepId">
            Step
            <input
              className="input__box"
              name="step"
              type="number"
              min="1"
              max="10"
              id="stepId"
              value={step}
              onChange={(event) => {
                this.setState({ step: +event.target.value });
              }}
            />
          </label>

          <label className="input__item" htmlFor="frameId">
            Frame size
            <input
              className="input__box"
              name="frameSize"
              type="number"
              id="frameId"
              min="1"
              max="10"
              value={frameSize}
              onChange={(event) => {
                this.setState({ frameSize: +event.target.value });
              }}
            />
          </label>

          <label className="input__item" htmlFor="itemId">
            Item width
            <input
              className="input__box"
              name="itemWidth"
              type="number"
              id="itemId"
              min="50"
              max="190"
              step="10"
              value={itemWidth}
              onChange={(event) => {
                this.setState({ itemWidth: +event.target.value });
              }}
            />
          </label>

          <label className="input__item">
            Animation duration
            <input
              className="input__box"
              name="animationDuration"
              type="number"
              min="100"
              max="2500"
              step="100"
              value={animationDuration}
              onChange={(event) => {
                this.setState({ animationDuration: +event.target.value });
              }}
            />
            <input
              name="infinite"
              type="checkbox"
              id="input"
              checked={infinite}
            />
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <label
              htmlFor="checkbox"
              className="checkLabel"
              id="label"
              onClick={() => {
                this.setState({ infinite: !infinite });
              }}
            >
              <div id="tick_mark" className="checkDiv" />
            </label>
          </label>
        </div>
      </div>
    );
  }
}

export default Carousel;
