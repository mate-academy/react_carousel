/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './Carousel.scss';
import './variables.scss';
import ClassNames from 'classnames';

class Carousel extends React.Component<Props, State> {
  state = {
    counter: 0,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  nextButton = () => {
    const {
      step,
      frameSize,
      counter,
    } = this.state;

    if ((counter - frameSize - step) >= -10) {
      this.setState({ counter: counter - step });
    } else {
      this.setState({ counter: -10 + frameSize });
    }
  };

  prevButton = () => {
    const {
      step,
      counter,
    } = this.state;

    if ((counter + step) <= 0) {
      this.setState({ counter: counter + step });
    } else {
      this.setState({ counter: 0 });
    }
  };

  setImageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });

    if (this.state.frameSize < 1) {
      this.setState({ frameSize: 1 });
    }
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  setAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });

    if (this.state.animationDuration < 100) {
      this.setState({ animationDuration: 0 });
    }
  };

  render() {
    const {
      frameSize,
      counter,
      step,
      itemWidth,
      animationDuration,
    } = this.state;

    const { images } = this.props;

    return (
      <>
        <div className="Carousel">
          <div
            className="Carousel-container"
            style={{
              width: `${frameSize * itemWidth}px`,
            }}
          >
            <ul
              className="Carousel__list"
              style={{
                transform: `translateX(${counter}px)`,
                marginLeft: `${counter * itemWidth}px`,
                transition: `${animationDuration}ms`,
                width: `${frameSize * itemWidth}px`,
              }}
            >
              {images.map((image, index) => (
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

          </div>
        </div>

        <div className="Control-panel">
          {/* Previous Button */}
          <div className="Control-panel__buttons buttons">
            <button
              type="button"
              onClick={() => {
                this.prevButton();
              }}
              className={ClassNames('buttons__prev-button', {
                disabled: counter === 0,
              })}
              disabled={counter === 0}
            />

            {/* Next Button */}
            <button
              type="button"
              className={ClassNames('buttons__next-button', {
                disabled: counter <= -images.length + step,
              })}
              onClick={() => {
                this.nextButton();
              }}
              disabled={counter <= -images.length + step}
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
            type="range"
            value={itemWidth}
            step={10}
            min={10}
            max={400}
            placeholder="Set an image size"
            className="Control-panel__setItemWidth"
            onChange={this.setImageSize}
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
            type="range"
            min={1}
            max={images.length}
            value={frameSize}
            placeholder="Set a frame size"
            className="Control-panel__setFrame"
            onChange={this.setFrameSize}
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
            type="range"
            min={1}
            max={images.length}
            value={step}
            placeholder="Set scroll step"
            className="Control-panel__setStep"
            onChange={this.setStep}
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
            type="range"
            min={0}
            max={5000}
            step={100}
            value={animationDuration}
            placeholder="Set animation duration"
            className="Control-panel__animationTime"
            onChange={this.setAnimationDuration}
          />

        </div>
      </>
    );
  }
}

export default Carousel;
