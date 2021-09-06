/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  shift: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    shift: 0,
  };

  next(width: number, step: number, length: number, infinite: boolean) {
    const maxShift = width * (length - step);
    const shiftOfStep = width * step;

    this.setState((state) => {
      if (infinite && state.shift === (-maxShift)) {
        return {
          shift: 0,
        };
      }

      return {
        shift: Math.max(state.shift - shiftOfStep, -maxShift),
      };
    });
  }

  prev(width: number, step: number, length: number, infinite: boolean) {
    const maxShift = width * (length - step);
    const shiftOfStep = width * step;

    this.setState((state) => {
      if (infinite && state.shift === 0) {
        return {
          shift: -maxShift,
        };
      }

      return {
        shift: Math.min(state.shift + shiftOfStep, 0),
      };
    });
  }

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      step,
      animationDuration,
      infinite,
    } = this.props;

    const { shift } = this.state;

    return (
      <>
        <div
          className="Carousel"
          style={{ width: itemWidth * frameSize }}
        >
          <ul
            className="Carousel__list"
            style={{
              transition: `transform ${animationDuration}ms ease`,
              transform: `translateX(${shift}px)`,
            }}
          >
            {images.map((image: string, i: number) => (
              <li
                className="Carousel__item"
                key={image}
              >
                <img
                  src={image}
                  alt={`${i}`}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons">
          <button
            type="button"
            onClick={() => {
              this.prev(itemWidth, step, images.length, infinite);
            }}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => {
              this.next(itemWidth, step, images.length, infinite);
            }}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}
