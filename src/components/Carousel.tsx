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
  position: number;
  disabledNext: boolean,
  disabledPrev: boolean,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    position: 0,
    disabledNext: false,
    disabledPrev: true,
  };

  changeStepValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
    this.updateButtonState();
  };

  changeFrameSizeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
    this.updateButtonState();
  };

  changeItemWidthValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
    this.updateButtonState();
  };

  changeAnimationDurationValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  changeInfiniteValue = () => {
    this.setState((state) => ({
      infinite: !state.infinite,
    }));
  };

  updateButtonState = () => {
    const minX = (this.props.images.length - this.state.frameSize) * this.state.itemWidth * -1;
    const maxX = 0;

    this.setState((state) => ({
      disabledNext: !(state.position > minX),
      disabledPrev: !(state.position < maxX),
    }));
  };

  nextButtonHandler = () => {
    const maxShift = (this.props.images.length - this.state.frameSize) * this.state.itemWidth * -1;
    const shift = this.state.itemWidth * this.state.step * -1;
    const currentShift = this.state.position + shift;

    if (currentShift < maxShift) {
      this.setState(() => ({
        position: maxShift,
      }));
    } else {
      this.setState({
        position: currentShift,
      });
    }

    if (this.state.infinite) {
      this.setInfinite();
    } else {
      this.updateButtonState();
    }
  };

  prevtButtonHandler = () => {
    const shift = this.state.itemWidth * this.state.step;
    const currentShift = this.state.position + shift;

    if (currentShift > 0) {
      this.setState((state) => ({
        position: state.position - state.position,
      }));
    } else {
      this.setState((state) => ({
        position: state.position + shift,
      }));
    }

    if (this.state.infinite) {
      this.setInfinite();
    } else {
      this.updateButtonState();
    }
  };

  setInfinite = () => {
    const minX = (this.props.images.length - this.state.frameSize) * this.state.itemWidth * -1;
    const maxX = 0;

    if (this.state.position === minX) {
      this.setState({
        position: maxX,
        disabledNext: false,
      });
    }

    if (this.state.position === maxX) {
      this.setState({
        position: minX,
        disabledPrev: false,
      });
    }
  };

  render() {
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      position,
      disabledNext,
      disabledPrev,
    } = this.state;

    return (
      <div
        className="Carousel"
      >
        <ul
          className="Carousel__list"
          style={{
            width: frameSize * itemWidth,
          }}
        >
          {this.props.images.map((image, index) => {
            return (
              <li
                key={+index}
                className="Carousel__item"
              >
                <img
                  src={image}
                  alt={`${index + 1}`}
                  style={{
                    width: itemWidth,
                    height: itemWidth,
                    transform: `translateX(${position}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                />
              </li>
            );
          })}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            disabled={disabledPrev}
            onClick={this.prevtButtonHandler}
          >
            Prev
          </button>

          <button
            type="button"
            className="Carousel__button"
            disabled={disabledNext}
            onClick={this.nextButtonHandler}
          >
            Next
          </button>
        </div>

        <div className="Carousel__label-box">
          <label
            htmlFor="step"
            className="Carousel__label"
          >
            <span>Step:</span>
            <input
              id="step"
              type="range"
              value={step}
              min={1}
              max={10}
              onChange={this.changeStepValue}
            />
          </label>

          <label
            htmlFor="frameSize"
            className="Carousel__label"
          >
            <span>Frame Size:</span>
            <input
              id="frameSize"
              type="range"
              value={frameSize}
              min={1}
              max={10}
              onChange={this.changeFrameSizeValue}
            />
          </label>

          <label
            htmlFor="itemWidth"
            className="Carousel__label"
          >
            <span>Item Width:</span>
            <input
              id="itemWidth"
              type="range"
              value={itemWidth}
              min={50}
              max={300}
              onChange={this.changeItemWidthValue}
            />
          </label>

          <label
            htmlFor="animationDuration"
            className="Carousel__label"
          >
            <span>Animation Duration:</span>
            <input
              id="animationDuration"
              type="range"
              value={animationDuration}
              min={500}
              max={5000}
              onChange={this.changeAnimationDurationValue}
            />
          </label>

          <label
            htmlFor="infinite"
            className="Carousel__label"
          >
            <span>Infinite:</span>
            <input
              id="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.changeInfiniteValue}
            />
          </label>

        </div>

      </div>
    );
  }
}
