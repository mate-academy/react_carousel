import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

type State = {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  currentItemIndex: number;
  infinite: boolean;
};

class Carousel extends React.Component<Props, State> {
  state: State = {
    step: 0,
    frameSize: 0,
    itemWidth: 130,
    animationDuration: 1000,
    currentItemIndex: 0,
    infinite: false,
  };

  handleImagesNext = () => {
    const {
      step,
      frameSize,
      infinite,
      currentItemIndex: position,
    } = this.state;

    let newPosition = position - step;

    if (infinite) {
      if (newPosition <= -this.props.images.length) {
        newPosition = 0;
      }
    } else if (newPosition <= -this.props.images.length + frameSize) {
      newPosition = -this.props.images.length + frameSize;
    }

    this.setState({ currentItemIndex: newPosition });
  };

  handleImagesPrev = () => {
    const {
      step,
      currentItemIndex: position,
      infinite,
    } = this.state;

    let newPosition = position + step;

    if (infinite) {
      if (newPosition > 0) {
        newPosition = -this.props.images.length + this.state.frameSize;
      }
    } else if (newPosition > 0) {
      newPosition = 0;
    } else if (newPosition > this.props.images.length - this.state.frameSize) {
      newPosition = this.props.images.length - this.state.frameSize;
    }

    this.setState({ currentItemIndex: newPosition });
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

  changeInfinite = () => {
    this.setState((prevState) => ({ infinite: !prevState.infinite }));
  };

  render() {
    const { images } = this.props;

    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      currentItemIndex: position,
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
            this.handleImagesPrev();
          }}
        >
          Prev
        </button>

        <button
          type="button"
          className="button"
          onClick={() => {
            this.handleImagesNext();
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

          <label
            htmlFor="itemId"
            className="label"
          >
            Infinite:
            <input
              type="checkbox"
              id="itemId"
              className="input"
              checked={infinite}
              onChange={this.changeInfinite}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Carousel;
