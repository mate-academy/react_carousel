import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
};
type State = {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  currentPosition: number;
  disabledLeft: boolean;
  disabledRight: boolean;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    currentPosition: 0,
    disabledLeft: true,
    disabledRight: false,
  };

  leftScroll = () => {
    const {
      step, itemWidth, currentPosition, infinite,
    } = this.state;
    const stepWidth = itemWidth * step;
    const shift = currentPosition + stepWidth;

    if (shift > 0) {
      this.setState((state) => ({
        currentPosition: state.currentPosition - state.currentPosition,
      }));
    } else {
      this.setState((state) => ({
        currentPosition: state.currentPosition + stepWidth,
      }));
    }

    if (infinite) {
      this.setInfinite();
    } else {
      this.updateButtonState();
    }
  };

  rightScroll = () => {
    const {
      step, itemWidth, frameSize, currentPosition, infinite,
    } = this.state;
    const { images } = this.props;
    const maxShift = (images.length - frameSize) * itemWidth * -1;
    const stepWidth = itemWidth * step * -1;
    const current = currentPosition + stepWidth;

    if (current < maxShift) {
      this.setState(() => ({
        currentPosition: maxShift,
      }));
    } else {
      this.setState({
        currentPosition: current,
      });
    }

    if (infinite) {
      this.setInfinite();
    } else {
      this.updateButtonState();
    }
  };

  setStep = (el: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      step: +el.target.value,
    });
    this.updateButtonState();
  };

  setFrameSize = (el: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      frameSize: +el.target.value,
    });
    this.updateButtonState();
  };

  setItemWidth = (el: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemWidth: +el.target.value,
    });
    this.updateButtonState();
  };

  setAnimationDuration = (el: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      animationDuration: +el.target.value,
    });
  };

  setInfinite = () => {
    const { images } = this.props;
    const { frameSize, itemWidth, currentPosition } = this.state;
    const min = (images.length - frameSize) * itemWidth * -1;
    const max = 0;

    if (currentPosition === min) {
      this.setState({
        currentPosition: max,
        disabledRight: false,
      });
    }

    if (currentPosition === max) {
      this.setState({
        currentPosition: min,
        disabledLeft: false,
      });
    }
  };

  changeInfinite = () => {
    this.setState((state) => ({
      infinite: !state.infinite,
    }));
  };

  updateButtonState = () => {
    const { images } = this.props;
    const { frameSize, itemWidth } = this.state;
    const min = (images.length - frameSize) * itemWidth * -1;
    const max = 0;

    this.setState((state) => ({
      disabledLeft: !(state.currentPosition < max),
      disabledRight: !(state.currentPosition > min),
    }));
  };

  render() {
    const { images } = this.props;
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      currentPosition,
      disabledLeft,
      disabledRight,
    } = this.state;
    const listWidth = itemWidth * frameSize;

    return (
      <div className="Carousel">
        <ul className="Carousel__list" style={{ width: listWidth }}>
          {images.map(image => (
            <li
              key={image}
              className="Carousel__image"
            >
              <img
                src={image}
                alt={`${images.indexOf(image) + 1}`}
                style={{
                  width: itemWidth,
                  transform: `translateX(${currentPosition}px)`,
                  transition: `${animationDuration}ms`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            disabled={disabledLeft}
            onClick={this.leftScroll}
          >
            Prev
          </button>

          <button
            type="button"
            className="Carousel__button"
            disabled={disabledRight}
            onClick={this.rightScroll}
            data-cy="next"
          >
            Next
          </button>
        </div>

        <div className="Carousel__label-container">
          <label
            htmlFor="step"
            className="Carousel__label"
          >
            Step
            <input
              id="step"
              type="number"
              min={1}
              max={5}
              value={step}
              onChange={this.setStep}
            />
          </label>

          <label
            htmlFor="frameSize"
            className="Carousel__label"
          >
            Frame size
            <input
              id="frameSize"
              type="number"
              value={frameSize}
              min={1}
              max={5}
              onChange={this.setFrameSize}
            />
          </label>

          <label
            htmlFor="itemWidth"
            className="Carousel__label"
          >
            Image width
            <input
              id="itemWidth"
              type="number"
              min={50}
              max={300}
              value={itemWidth}
              onChange={this.setItemWidth}
            />
          </label>

          <label
            htmlFor="animationDuration"
            className="Carousel__label"
          >
            Animation duration
            <input
              id="animationDuration"
              type="number"
              min={300}
              max={3000}
              value={animationDuration}
              onChange={this.setAnimationDuration}
            />
          </label>

          <label
            htmlFor="infinite"
            className="Carousel__label"
          >
            Infinite
            <input
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.changeInfinite}
            />
          </label>
        </div>
      </div>
    );
  }
}
