import React from 'react';
import './Carousel.scss';
import { entryData } from './enrtyData';

type Props = {
  images: string[];
};

type State = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  initPosition: number;
  disabledNext: boolean;
  disabledPrev: boolean;
};

export class Carousel extends React.Component<Props, State> {
  state = entryData;

  moveLeft = () => {
    const {
      itemWidth,
      frameSize,
      step,
      initPosition,
    } = this.state;

    const { images } = this.props;

    const newPosition = initPosition + itemWidth * step;
    const maxShift = (images.length - frameSize) * itemWidth;

    if (newPosition > maxShift) {
      this.setState({ initPosition: maxShift });
      this.setState({ disabledNext: true });
    } else {
      this.setState({ initPosition: newPosition });
      this.setState({ disabledPrev: false });
    }
  };

  moveRight = () => {
    const {
      itemWidth,
      step,
      initPosition,
    } = this.state;

    const newPosition = initPosition - itemWidth * step;

    if (newPosition < 0) {
      this.setState({ initPosition: 0 });
      this.setState({ disabledPrev: true });
    } else {
      this.setState({ initPosition: newPosition });
      this.setState({ disabledNext: false });
    }
  };

  changeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  changeAnimationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  render() {
    const { images } = this.props;

    const {
      itemWidth,
      frameSize,
      initPosition,
      animationDuration,
      step,
      disabledNext,
      disabledPrev,
    } = this.state;

    return (
      <div className="Carousel">
        <div className="Carousel_window">
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${initPosition}px)`,
              transition: `${animationDuration}ms`,
              width: `${frameSize * itemWidth}px`,
            }}
          >
            {images.map(image => (
              <li key={image}>
                <img
                  src={image}
                  alt={`emotion-${images.indexOf(image)}`}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            ))}
          </ul>
          <div className="Carousel_controls">
            <button
              className="Carousel_btn"
              type="button"
              onClick={this.moveRight}
              disabled={disabledPrev}
            >
              Prev
            </button>
            <button
              className="Carousel_btn"
              type="button"
              onClick={this.moveLeft}
              disabled={disabledNext}
              data-cy="next"
            >
              Next
            </button>
          </div>
        </div>
        <div className="Carousel_options">
          <label htmlFor="itemId" className="Carousel_label">
            Item Width:
            <input
              className="Carousel_input"
              type="number"
              id="itemId"
              name="input_width"
              onChange={this.changeItemWidth}
              value={itemWidth}
              min={130}
            />
          </label>
          <label htmlFor="frameId" className="Carousel_label">
            Frame Size:
            <input
              className="Carousel_input"
              type="number"
              id="frameId"
              onChange={this.changeFrameSize}
              value={frameSize}
              min={1}
            />
          </label>
          <label htmlFor="stepId" className="Carousel_label">
            Step:
            <input
              className="Carousel_input"
              type="number"
              id="stepId"
              onChange={this.changeStep}
              value={step}
              min={1}
            />
          </label>
          <label htmlFor="input_size" className="Carousel_label">
            Animation Duration:
            <input
              className="Carousel_input"
              type="number"
              id="input_animation"
              onChange={this.changeAnimationDuration}
              value={animationDuration}
            />
          </label>
        </div>
      </div>
    );
  }
}
