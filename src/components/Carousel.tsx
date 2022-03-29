/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[]
};

type State = {
  frameSize: number;
  imageSize: number;
  step: number;
  position: number;
  duration: number;
  isInfinity: boolean;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    frameSize: 3,
    imageSize: 130,
    step: 2,
    position: this.props.images.length / 2 - 1,
    duration: 2,
    isInfinity: false,
  };

  moveLeft() {
    const {
      position,
      step,
      isInfinity,
      frameSize,
    } = this.state;
    const { images } = this.props;

    if (position === 0 && isInfinity) {
      this.setState({ position: images.length - frameSize });
    } else if (position - step < 0) {
      this.setState({ position: 0 });
    } else {
      this.setState((state) => ({
        position: state.position - state.step,
      }));
    }
  }

  moveRight() {
    const {
      position,
      frameSize,
      step,
      isInfinity,
    } = this.state;
    const { images } = this.props;

    if (position === images.length - frameSize && isInfinity) {
      this.setState({ position: 0 });
    } else if (position + step >= images.length - frameSize) {
      this.setState({ position: images.length - frameSize });
    } else {
      this.setState((state) => ({
        position: state.position - state.step * -1,
      }));
    }
  }

  increaseImageSize() {
    this.setState((state) => ({
      imageSize: state.imageSize + 10,
    }));
  }

  reduceImageSize() {
    this.setState((state) => ({
      imageSize: state.imageSize - 10,
    }));
  }

  increaseFrameSize() {
    this.setState((state) => ({
      frameSize: state.frameSize + 1,
      position: this.props.images.length / 2 - 1,
    }));
  }

  reduceFrameSize() {
    this.setState((state) => ({
      frameSize: state.frameSize - 1,
    }));
  }

  addStep() {
    this.setState((state) => ({
      step: state.step + 1,
    }));
  }

  removeStep() {
    this.setState((state) => ({
      step: state.step - 1,
    }));
  }

  increaseAnimationDuration() {
    this.setState((state) => ({
      duration: state.duration + 0.5,
    }));
  }

  reduceAnimationDuration() {
    this.setState((state) => ({
      duration: state.duration - 0.5,
    }));
  }

  infinity(value: boolean) {
    this.setState({ isInfinity: value });
  }

  render() {
    const { images } = this.props;
    const {
      frameSize,
      imageSize,
      position,
      duration,
      step,
      isInfinity,
    } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Carousel__wrapper"
          style={{ width: `${frameSize * imageSize}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${position * imageSize}px)`,
              transition: `transform ${duration}s linear`,
            }}
          >
            {images.map((image, index) => (
              <li
                key={image}
                className="Carousel__list-item"
              >
                <img
                  src={image}
                  alt={index.toString()}
                  style={{ width: imageSize, height: imageSize }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons Carrousel__buttons">
          <div className="move-buttons buttons__move-buttons">
            <button
              type="button"
              className="move-buttons__button"
              onClick={() => {
                this.moveLeft();
              }}
              disabled={position === 0 && !isInfinity}
            >
              {'<'}
            </button>
            <button
              type="button"
              className="move-buttons__button"
              onClick={() => {
                this.moveRight();
              }}
              disabled={position === images.length - frameSize && !isInfinity}
            >
              {'>'}
            </button>
          </div>
          <div
            className="option-buttons buttons__option-buttons"
            style={{ width: frameSize * imageSize }}
          >
            <div className="option-buttons__box">
              <button
                type="button"
                className="button option-buttons__button"
                onClick={() => {
                  this.reduceImageSize();
                }}
                disabled={imageSize <= 90}
              >
                -
              </button>
              <div className="option-buttons__info">
                <span className="info">
                  image size
                </span>
                <span className="info">
                  {imageSize}
                </span>
              </div>
              <button
                type="button"
                className="button option-buttons__button"
                onClick={() => {
                  this.increaseImageSize();
                }}
                disabled={imageSize >= 170}
              >
                +
              </button>
            </div>
            <div className="option-buttons__box">
              <button
                type="button"
                className="button option-buttons__button"
                onClick={() => {
                  this.reduceFrameSize();
                }}
                disabled={frameSize === 1}
              >
                -
              </button>
              <div className="option-buttons__info">
                <span className="info">
                  frame size
                </span>
                <span className="info">
                  {frameSize}
                </span>
              </div>
              <button
                type="button"
                className="button option-buttons__button"
                onClick={() => {
                  this.increaseFrameSize();
                }}
                disabled={frameSize === 5}
              >
                +
              </button>
            </div>
            <div className="option-buttons__box">
              <button
                type="button"
                className="button option-buttons__button"
                onClick={() => {
                  this.removeStep();
                }}
                disabled={step === 1}
              >
                -
              </button>
              <div className="option-buttons__info">
                <span className="info">
                  step
                </span>
                <span className="info">
                  {step}
                </span>
              </div>
              <button
                type="button"
                className="button option-buttons__button"
                onClick={() => {
                  this.addStep();
                }}
                disabled={step === 5}
              >
                +
              </button>
            </div>
            <div className="option-buttons__box">
              <button
                type="button"
                className="button option-buttons__button"
                onClick={() => {
                  this.reduceAnimationDuration();
                }}
                disabled={duration === 0.5}
              >
                -
              </button>
              <div className="option-buttons__info">
                <span className="info">
                  animation duration
                </span>
                <span className="info">
                  {duration * 2}
                </span>
              </div>
              <button
                type="button"
                className="button option-buttons__button"
                onClick={() => {
                  this.increaseAnimationDuration();
                }}
                disabled={duration === 3.5}
              >
                +
              </button>
            </div>
            <div className="option-buttons__box">
              <span className="option-buttons__plug">
                plug
              </span>
              <div className="option-buttons__info">
                <span className="info">
                  infinite
                </span>
              </div>
              <div className="option-buttons__checkbox">
                <input
                  id="check"
                  type="checkbox"
                  className="checkbox"
                  onClick={(event) => {
                    this.infinity(event.currentTarget.checked);
                  }}
                />
                <label
                  htmlFor="check"
                  className="checkbox-label"
                >
                  x
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
