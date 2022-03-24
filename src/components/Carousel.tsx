/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './Carousel.scss';
import './variables.scss';
import ClassNames from 'classnames';

const imagesSrc: string[] = [
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/7.png',
  './img/8.png',
  './img/9.png',
  './img/10.png',
];

class Carousel extends React.Component<Props, State> {
  state = {
    counter: 0,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  render() {
    let { frameSize } = this.state;
    const {
      counter,
      step,
      itemWidth,
      animationDuration,
    } = this.state;

    frameSize *= itemWidth;

    return (
      <div className="Carousel">
        <div className="Carousel-container">
          <ul
            className="Carousel__list"
            style={
              {
                width: `${frameSize}px`,
                overflow: 'hidden',
              }
            }
          >
            {imagesSrc.map((image, index) => (
              <li
                key={image}
                className="Carousel__list-img"
              >
                <img
                  src={image}
                  alt={(index + 1).toString()}
                  style={
                    {
                      width: `${itemWidth}px`,
                    }
                  }
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => {
              const showNextImgs = document.querySelector('.Carousel__list');

              setTimeout(() => {
                // explicit check to avoid typescript error
                if (showNextImgs?.tagName === 'UL') {
                  showNextImgs.scrollLeft -= (itemWidth * step);
                }

                if (counter <= 0) {
                  this.setState({ counter: 0 });
                }

                this.setState(prevState => {
                  return {
                    counter: (prevState.counter - step),
                  };
                });
              }, animationDuration);
            }}
            className={ClassNames('Carousel__prev-button', {
              disabled: counter === 0,
            })}
            disabled={counter <= 0}
          >
            {/* <i>Previous</i> */}
          </button>

          <button
            type="button"
            className={ClassNames('Carousel__next-button', {
              disabled: counter >= 8,
            })}
            disabled={counter >= 8}
            onClick={() => {
              setTimeout(() => {
                const showNextImgs = document.querySelector('.Carousel__list');

                // Explicit check to avoid typescript error
                if (showNextImgs?.tagName === 'UL') {
                  showNextImgs.scrollLeft += (itemWidth * step);
                }

                // Disables "Next" button
                if (counter + (frameSize / itemWidth) >= imagesSrc.length) {
                  this.setState({ counter: 8 });
                }

                this.setState(prevState => {
                  return {
                    counter: (prevState.counter + step),
                  };
                });
              }, animationDuration);
            }}
          />
        </div>
        <label
          htmlFor="width"
        >
          Change Image Width:
          {' '}
        </label>
        <input
          id="width"
          type="number"
          placeholder="Set an image size"
          className="Carousel__setItemWidth"
          onChange={(event) => {
            this.setState({ itemWidth: +event.target.value });
          }}
        />
        <br />
        <label
          htmlFor="frameSize"
        >
          Change FrameSize:
          {' '}
        </label>
        <input
          id="frameSize"
          type="number"
          placeholder="Set a frame size"
          className="Carousel__setFrame"
          max={imagesSrc.length}
          onChange={(event) => {
            this.setState({ frameSize: +event.target.value });

            if (frameSize < 1) {
              this.setState({ frameSize: 1 });
            }
          }}
        />
        <br />
        <label
          htmlFor="step"
        >
          Scroll Step:
          {' '}
        </label>
        <input
          id="step"
          type="number"
          placeholder="Set scroll step"
          className="Carousel__setStep"
          max={imagesSrc.length}
          onChange={(event) => {
            this.setState({ step: +event.target.value });
          }}
        />
        <br />
        <label
          htmlFor="animation"
        >
          Animation duration:
          {' '}
        </label>
        <input
          id="animation"
          type="number"
          step={100}
          placeholder="Set animation duration"
          className="Carousel__animationTime"
          onChange={(event) => {
            this.setState({ animationDuration: +event.target.value });

            if (animationDuration < 100) {
              this.setState({ animationDuration: 0 });
            }
          }}
        />
      </div>
    );
  }
}

export default Carousel;
