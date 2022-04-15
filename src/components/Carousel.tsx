import React from 'react';
import './Carousel.scss';
import classNames from 'classnames';

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

  slideRigth = () => {
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

          <button
            type="button"
            className={classNames(
              'button',
              'button__left',
              {
                button__notactive: position === 0 && !infinite,
              },
            )}
            onClick={this.slideLeft}
          >
            <img src="./img/arrow-left.svg" alt="Arrow-left" />
          </button>

          <button
            type="button"
            className={classNames(
              'button',
              'button__right',
              {
                button__notactive: position === -10 + frameSize && !infinite,
              },
            )}
            onClick={this.slideRigth}
          >
            <img src="./img/arrow-right.svg" alt="Arrow-right" />
          </button>
        </div>

        <div className="input">
          <label className="input__item">
            Step
            <input
              className="input__box"
              name="step"
              type="number"
              value={step}
              onChange={(event) => {
                this.setState({ step: +event.target.value });
              }}
            />
          </label>

          <label className="input__item">
            Frame size
            <input
              className="input__box"
              name="frameSize"
              type="number"
              value={frameSize}
              onChange={(event) => {
                this.setState({ frameSize: +event.target.value });
              }}
            />
          </label>

          <label className="input__item">
            Item width
            <input
              className="input__box"
              name="itemWidth"
              type="number"
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
              value={animationDuration}
              onChange={(event) => {
                this.setState({ animationDuration: +event.target.value });
              }}
            />
          </label>

          <label className="input__item">
            Infinite
            <input
              className="input__box"
              name="infinite"
              type="checkbox"
              checked={infinite}
              onChange={() => {
                this.setState({ infinite: !infinite });
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Carousel;
