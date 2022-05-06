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

      let bigger = step;
      let smaller = frameSize;

      if (frameSize > step) {
        bigger = frameSize;
        smaller = step;
      }

      if (prevState.counter > images.length - bigger * 2
        && prevState.counter < images.length - bigger) {
        if (bigger === step) {
          return { counter: images.length - smaller };
        }

        return { counter: images.length - bigger };
      }

      if (prevState.counter === images.length - smaller
        && bigger === step) {
        if (infinite) {
          return { counter: 0 };
        }

        return { counter: prevState.counter };
      }

      if (prevState.counter === images.length - bigger
        && bigger === frameSize) {
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
      const {
        images,
        step,
        infinite,
        frameSize,
      } = this.props;

      let bigger = step;

      if (frameSize > step) {
        bigger = frameSize;
      }

      if (prevState.counter < bigger
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
      <>
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
              >
                <img
                  src={image}
                  alt={image[i + 1]}
                  style={{
                    width: `${itemWidth}px`,
                    height: `${100}%`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-buttons">
          <button
            type="button"
            onClick={this.scrollLeft}
            className="button"
          >
            <p className="button__text">LEFT</p>
          </button>

          <button
            type="button"
            onClick={this.scrollRight}
            className="button"
          >
            <p className="button__text">RIGHT</p>
          </button>
        </div>
      </>
    );
  }
}
