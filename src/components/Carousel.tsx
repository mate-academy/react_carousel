/* eslint-disable no-console */
import React from 'react';
import './Carousel.scss';
import { Sizes } from '../types/Sizes';

type Props = Sizes & {
  images: string[];
};

type State = {
  counter: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    counter: 0,
  };

  scrollRight = () => {
    this.setState((prevState) => {
      const {
        images,
        step,
        infinite,
        frameSize,
      } = this.props;

      if (prevState.counter > images.length - step * 2
        && prevState.counter < images.length - step) {
        return { counter: images.length - frameSize };
      }

      if (prevState.counter === images.length - frameSize) {
        if (infinite) {
          return { counter: 0 };
        }

        return { counter: prevState.counter };
      }

      return { counter: prevState.counter + step };
    });
  };

  scrollLeft = () => {
    this.setState((prevState) => {
      const { images, step, infinite } = this.props;

      if (prevState.counter < step
        && prevState.counter > 0) {
        return { counter: 0 };
      }

      if (prevState.counter === 0) {
        if (infinite) {
          return { counter: images.length - step };
        }

        return { counter: prevState.counter };
      }

      return { counter: prevState.counter - step };
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;
    const { counter } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `all ${animationDuration}ms`,
            transform: `translateX(${-itemWidth * counter}px)`,
            width: `${itemWidth * images.length}px`,
          }}
        >
          {images.map((image, i) => (
            <li
              key={image}
              className="Carousel__item"
              style={{
                width: `${itemWidth}px`,
                height: `${100}%`,
              }}
            >
              <img src={image} alt={image[i + 1]} />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            onClick={this.scrollLeft}
            className="Carousel__button"
          >
            LEFT
          </button>

          <button
            type="button"
            onClick={this.scrollRight}
            className="Carousel__button"
          >
            RIGHT
          </button>
        </div>
      </div>
    );
  }
}
