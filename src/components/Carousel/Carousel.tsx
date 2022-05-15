import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
}

interface State {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  currentPosition: number;
}

export class Carousel extends React.Component<Props, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    currentPosition: 0,
  };

  scrollLeft = () => {
    const { images } = this.props;
    const {
      step, frameSize, itemWidth, currentPosition, infinite,
    } = this.state;

    const stepWidth = itemWidth * step;
    const maxShift = (images.length - frameSize) * itemWidth * -1;
    const expectedShift = currentPosition + stepWidth;

    if (expectedShift > 0) {
      this.setState({ currentPosition: 0 });
    } else {
      this.setState((state) => ({
        currentPosition: state.currentPosition + stepWidth,
      }));
    }

    if (infinite) {
      if (currentPosition === 0) {
        this.setState({ currentPosition: maxShift });
      }
    }
  };

  scrollRight = () => {
    const { images } = this.props;
    const {
      step, frameSize, itemWidth, currentPosition, infinite,
    } = this.state;

    const stepWidth = step * itemWidth;
    const maxShift = (images.length - frameSize) * itemWidth * -1;
    const expectedShift = currentPosition - stepWidth;

    if (expectedShift < maxShift) {
      this.setState({ currentPosition: maxShift });
    } else {
      this.setState({ currentPosition: expectedShift });
    }

    if (infinite) {
      if (currentPosition === maxShift) {
        this.setState({ currentPosition: 0 });
      }
    }
  };

  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case 'step':
        this.setState({ step: +value });
        break;

      case 'frameSize':
        this.setState({ frameSize: +value });
        break;

      case 'itemWidth':
        this.setState({ itemWidth: +value });
        break;

      case 'animationDuration':
        this.setState({ animationDuration: +value });
        break;

      case 'infinite':
        this.setState((state) => ({ infinite: !state.infinite }));
        break;

      default:
        break;
    }
  };

  render(): React.ReactNode {
    const { images } = this.props;
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      currentPosition,
    } = this.state;

    const maxShift = (images.length - frameSize) * itemWidth * -1;
    const listWidth = frameSize * itemWidth;

    return (
      <div className="Carousel">
        <ul className="Carousel__list" style={{ width: listWidth }}>
          {images.map(image => {
            return (
              <li
                className="Carousel__image"
                key={image}
              >
                <img
                  src={image}
                  alt={`${image.replace(/\D/g, '')}`}
                  style={{
                    width: itemWidth,
                    transform: `translateX(${currentPosition}px)`,
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
            disabled={currentPosition === 0 && !infinite}
            onClick={this.scrollLeft}
          >
            Prev
          </button>

          <button
            type="button"
            className="Carousel__button"
            disabled={currentPosition === maxShift && !infinite}
            onClick={this.scrollRight}
          >
            Next
          </button>
        </div>

        <form className="Carousel__form">
          <label
            htmlFor="step"
            className="Carousel__label"
          >
            Step
            <input
              id="step"
              type="number"
              className="Carousel__input"
              value={step}
              min={1}
              max={10}
              onChange={this.onChange}
            />
          </label>

          <label
            htmlFor="frameSize"
            className="Carousel__label"
          >
            Frame Size
            <input
              id="frameSize"
              type="number"
              className="Carousel__input"
              value={frameSize}
              min={1}
              max={10}
              onChange={this.onChange}
            />
          </label>

          <label
            htmlFor="itemWidth"
            className="Carousel__label"
          >
            Image Width
            <input
              id="itemWidth"
              type="number"
              className="Carousel__input"
              value={itemWidth}
              min={50}
              max={300}
              step={10}
              onChange={this.onChange}
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
              className="Carousel__input"
              value={animationDuration}
              min={300}
              max={3000}
              step={100}
              onChange={this.onChange}
            />
          </label>

          <div>
            <input
              id="infinite"
              className="infinite"
              type="checkbox"
              checked={infinite}
              onChange={this.onChange}
            />
            <label
              id="label"
              className="Carousel__label"
              htmlFor="infinite"
            >
              Infinite
            </label>
          </div>

        </form>
      </div>
    );
  }
}
