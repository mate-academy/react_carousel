import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

type State = {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  position: number,
};

class Carousel extends React.Component<Props, State> {
  state:State = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    position: 0,
  };

  nextButton = () => {
    const {
      step,
      frameSize,
      position,
    } = this.state;

    if ((position - frameSize - step) >= -10) {
      this.setState({ position: position - step });
    } else {
      this.setState({ position: -10 + frameSize });
    }
  };

  prevButton = () => {
    const {
      step,
      position,
    } = this.state;

    if ((position + step) <= 0) {
      this.setState({ position: position + step });
    } else {
      this.setState({ position: 0 });
    }
  };

  changeStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +e.target.value });
  };

  changeFrameSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +e.target.value });
  };

  changeItemWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +e.target.value });
  };

  changeAnimationDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +e.target.value });
  };

  render() {
    const { images } = this.props;

    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      position,
    } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Carousel_wrapper"
          style={{
            width: `${frameSize * itemWidth}px`,
          }}
        >
          <ul
            data-cy="carousel"
            className="Carousel__list"
            style={{
              transform: `translateX(${position}px)`,
              marginLeft: `${position * itemWidth}px`,
              transition: `${animationDuration}ms`,
              width: `${frameSize * itemWidth}px`,
            }}
          >
            {images.map((image) => (
              <li key="image" className="Carousel__item">
                <img
                  src={image}
                  alt="Smile"
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="button"
          onClick={() => {
            this.prevButton();
          }}
        >
          Prev
        </button>

        <button
          data-cy="next"
          type="button"
          className="button"
          onClick={() => {
            this.nextButton();
          }}
        >
          Next
        </button>

        <div className="labels">
          <label
            htmlFor="stepId"
            className="label"
          >
            Step:
            <input
              data-cy="step"
              type="number"
              id="stepId"
              className="input"
              min={1}
              max={10}
              value={step}
              onChange={this.changeStep}
            />
          </label>
          <label
            htmlFor="frameId"
            className="label"
          >
            Frame size:
            <input
              data-cy="frame"
              type="number"
              id="frameId"
              className="input"
              min={1}
              max={10}
              value={frameSize}
              onChange={this.changeFrameSize}
            />
          </label>

          <label
            htmlFor="itemId"
            className="label"
          >
            Item width:
            <input
              data-cy="width"
              type="number"
              id="itemId"
              className="input"
              max={390}
              value={itemWidth}
              onChange={this.changeItemWidth}
            />
          </label>

          <label
            htmlFor="animId"
            className="label"
          >
            Animation Duration:
            <input
              type="number"
              id="animId"
              className="input"
              value={animationDuration}
              onChange={this.changeAnimationDuration}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Carousel;
