import React from 'react';
import { CarouselSettings } from '../types/CarouselSettings';
import './Carousel.scss';

type State = {
  position: number,
};

export class Carousel extends React.Component<CarouselSettings, State> {
  state = {
    position: 0,
  };

  componentDidUpdate(prevProps: CarouselSettings) {
    if (this.props.maxValue > this.state.position) {
      if (prevProps.maxValue !== this.props.maxValue) {
        this.progress(this.props.step, this.props.maxValue);
      }
    }
  }

  progress = (step: number, maxValue: number) => {
    this.setState((prevState: State) : State | void => {
      const currentPosition = (-100 * step) + prevState.position;

      if (maxValue >= currentPosition) {
        return {
          position: maxValue,
        };
      }

      return {
        position: currentPosition,
      };
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      maxValue,
    } = this.props;

    const { position } = this.state;

    const itemStyle = {
      width: `${itemWidth}px`,
      height: `${itemWidth}px`,
      transition: `${animationDuration}ms`,
      transform: `translate(${position}%)`,
    };

    const listStyle = {
      width: `${itemWidth * frameSize}px`,
      height: `${itemWidth}px`,
    };

    return (
      <>
        <div className="Carousel">
          <ul className="Carousel__list" style={listStyle}>
            {images.map((image, index) => (
              <li key={image}>
                <img
                  src={image}
                  alt={String(index + 1)}
                  style={itemStyle}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          disabled={position >= 0}
          onClick={() => this.setState((prevState: State) => {
            const currentPosition = (100 * step) + prevState.position;

            if (currentPosition > 0) {
              return {
                position: 0,
              };
            }

            return {
              position: currentPosition,
            };
          })}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          disabled={maxValue >= this.state.position}
          onClick={() => this.progress(step, maxValue)}
        >
          Next
        </button>
      </>
    );
  }
}

export default Carousel;
