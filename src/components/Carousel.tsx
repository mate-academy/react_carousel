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
  position: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  shift = 0;

  next(width: number, step: number, length: number, infinite: boolean) {
    const maxShift = width * (length - step);

    if (infinite && this.shift === (-maxShift)) {
      this.shift = 0;
    } else {
      this.shift -= width * step;
      this.shift = Math.max(this.shift, -maxShift);
    }

    this.setState(() => ({
      position: this.shift,
    }));
  }

  prev(width: number, step: number, length: number, infinite: boolean) {
    const maxShift = width * (length - step);

    if (infinite && this.shift === 0) {
      this.shift = -maxShift;
    } else {
      this.shift += width * step;
      this.shift = Math.min(this.shift, 0);
    }

    this.setState(() => ({
      position: this.shift,
    }));
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

    const { position } = this.state;

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
              transform: `translateX(${position}px)`,
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
