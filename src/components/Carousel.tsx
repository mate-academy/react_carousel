import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
}

interface State {
  containerWidth: number,
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  transformPoint: number;
  nextButtonIsDisabled: boolean;
  prevButtonIsDisabled: boolean;
}

class Carousel extends React.Component<Props, State> {
  state = {
    containerWidth: 1300,
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    transformPoint: 0,
    nextButtonIsDisabled: false,
    prevButtonIsDisabled: true,
  };

  moveNext = () => {
    const {
      containerWidth,
      itemWidth,
      transformPoint,
      step,
      frameSize,
    } = this.state;
    let newWidth = transformPoint + step * itemWidth;

    if (newWidth >= containerWidth - frameSize * itemWidth) {
      newWidth = containerWidth - frameSize * itemWidth;

      this.setState({
        transformPoint: newWidth,
        nextButtonIsDisabled: true,
        prevButtonIsDisabled: false,
      });
    }

    if (newWidth > 0 && newWidth < containerWidth - frameSize * itemWidth) {
      this.setState({
        transformPoint: newWidth,
        prevButtonIsDisabled: false,
      });
    }
  };

  movePrev = () => {
    const {
      containerWidth,
      itemWidth,
      transformPoint,
      step,
    } = this.state;
    let newWidth = transformPoint - step * itemWidth;

    if (newWidth <= 0) {
      newWidth = 0;

      this.setState({
        transformPoint: newWidth,
        prevButtonIsDisabled: true,
        nextButtonIsDisabled: false,
      });
    }

    if (newWidth > 0 && newWidth <= containerWidth) {
      this.setState({
        transformPoint: newWidth,
        nextButtonIsDisabled: false,
      });
    }
  };

  setFrameSize = (value: string) => {
    const number = +value;

    this.setState({ frameSize: number });
  };

  setItemWidth = (value: string) => {
    const number = +value;

    this.setState({
      itemWidth: number,
      containerWidth: 10 * number,
      transformPoint: 0,
      prevButtonIsDisabled: true,
      nextButtonIsDisabled: false,
    });
  };

  setStep = (value: string) => {
    const number = +value;

    this.setState({ step: number });
  };

  setAnimationDuration = (value: string) => {
    const number = +value;

    this.setState({ animationDuration: number });
  };

  render() {
    const { images } = this.props;

    return (
      <div
        className="container"
        style={{ width: `${this.state.frameSize * this.state.itemWidth}px` }}
      >
        <div
          className="Carousel"
          style={{ width: `${this.state.containerWidth}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${-this.state.transformPoint}px)`,
              transition: `${this.state.animationDuration}ms`,
            }}
          >
            {images.map((image, index) => {
              return (
                <li key={image}>
                  <img
                    src={image}
                    alt={index.toString()}
                    style={{ width: `${this.state.itemWidth}px` }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav">
          <div>
            <button
              type="button"
              onClick={this.movePrev}
              disabled={this.state.prevButtonIsDisabled}
            >
              Prev
            </button>

            <button
              type="button"
              onClick={this.moveNext}
              disabled={this.state.nextButtonIsDisabled}
            >
              Next
            </button>
          </div>

          <label htmlFor="frameSize">
            FrameSize
            <input
              type="number"
              min="1"
              max="10"
              id="frameSize"
              value={this.state.frameSize}
              onChange={(e) => {
                this.setFrameSize(e.target.value);
              }}
            />
          </label>

          <label htmlFor="itemWidth">
            itemWidth
            <input
              type="number"
              min="130"
              max="200"
              step="10"
              id="itemWidth"
              value={this.state.itemWidth}
              onChange={(event) => {
                this.setItemWidth(event.target.value);
              }}
            />
          </label>

          <label htmlFor="step">
            Step
            <input
              type="number"
              min="1"
              max="5"
              id="step"
              value={this.state.step}
              onChange={(event) => {
                this.setStep(event.target.value);
              }}
            />
          </label>

          <label htmlFor="animationDuration">
            AnimationDuration
            <input
              type="number"
              min="1000"
              max="3000"
              step="500"
              id="animationDuration"
              value={this.state.animationDuration}
              onChange={(event) => {
                this.setAnimationDuration(event.target.value);
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Carousel;
