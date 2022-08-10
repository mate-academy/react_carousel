/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/static-property-placement */
import React from 'react';

import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  position: number,
  prev: boolean,
  next: boolean,
};

export class Carousel extends React.Component<Props, State> {
  widthList = this.props.itemWidth * this.props.frameSize;

  static defaultProps = {
    itemWidth: 100,
    frameSize: 2,
  };

  state: Readonly<State> = {
    position: 0,
    prev: true,
    next: false,
  };

  scrollPrev = () => {
    const { step } = this.props;

    this.setState(({ position }) => ({
      position: position - step < 0 ? 0 : position - step,
    }));
    this.buttonDisabled();
  };

  scrollNext = () => {
    const { images, step } = this.props;

    this.setState(({ position }) => ({
      position: (position + 2 * step) > images.length
        ? images.length - step
        : images.length + step,
    }));
    this.buttonDisabled();
  };

  buttonDisabled = () => {
    const { images, step } = this.props;

    this.setState(({ position }) => ({
      prev: position === 0,
      next: position >= images.length - step,
    }));
  };

  render() {
    const { images, itemWidth, animationDuration } = this.props;
    const { position, prev, next } = this.state;

    const listStyle = {
      width: itemWidth * images.length,
      transitionDuration: `${animationDuration}ms`,
      transform: `translateX(-${position * itemWidth}px)`,
    };

    return (
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{
            width: this.widthList,
          }}
        >
          <ul className="Carousel__list" style={listStyle}>
            {images.map((image, index) => {
              const id = index + 1;

              return (
                <li className="Carousel__item" key={id}>
                  <img
                    src={image}
                    alt={`${index + 1}`}
                    className="Carousel__image"
                    style={{
                      width: itemWidth,
                      height: itemWidth,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="button">
          <button
            type="button"
            onClick={this.scrollPrev}
            disabled={prev}
            className="button__click"
          >
            Prev
          </button>

          <button
            type="button"
            onClick={this.scrollNext}
            disabled={next}
            className="button__click"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
