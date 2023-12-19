import React, { Component } from 'react';
import './Carousel.scss';

interface State {
  currentItemIndex: number,
}

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean;
};

export class Carousel extends Component<Props, State> {
  state = {
    currentItemIndex: 0,
  };

  nextButton = () => {
    const {
      step,
      frameSize,
      images,
      infinite,
    } = this.props;
    const { currentItemIndex } = this.state;

    const lastItemIndex = images.length - frameSize;

    this.setState({
      currentItemIndex: currentItemIndex + step > lastItemIndex
        ? lastItemIndex
        : currentItemIndex + step,
    });

    if (currentItemIndex === lastItemIndex && infinite) {
      this.setState({
        currentItemIndex: 0,
      });
    }
  };

  prevButton = () => {
    const {
      step,
      frameSize,
      images,
      infinite,
    } = this.props;
    const { currentItemIndex } = this.state;

    const firstItemIndex = 0;

    this.setState({
      currentItemIndex: currentItemIndex - step > firstItemIndex
        ? currentItemIndex - step
        : firstItemIndex,
    });

    if (currentItemIndex === firstItemIndex && infinite) {
      this.setState({
        currentItemIndex: images.length - frameSize,
      });
    }
  };

  render(): React.ReactNode {
    const { currentItemIndex } = this.state;
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const prevDisabled = currentItemIndex === 0 && !infinite;
    const nextDisabled = currentItemIndex === images.length - frameSize
      && !infinite;

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
      >

        <ul className="Carousel__list">
          {images.map((img, index) => (
            <li
              key={img}
              style={{
                transform: `translateX(-${currentItemIndex * itemWidth}px)`,
                transition: `${animationDuration}ms`,
              }}
            >
              <img
                src={img}
                alt={`emoticon #${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            onClick={this.prevButton}
            disabled={prevDisabled}
          >
            Prev
          </button>

          <button
            type="button"
            data-cy="next"
            onClick={this.nextButton}
            disabled={nextDisabled}
          >
            Next
          </button>
        </div>

      </div>
    );
  }
}
