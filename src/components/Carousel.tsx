import React, { Component } from 'react';
import './Carousel.scss';

type State = {
  currentIndex: number,
};

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    currentIndex: 0,
  };

  handleNextBtn = () => {
    const {
      step,
      frameSize,
      images,
      infinite,
    } = this.props;
    const { currentIndex } = this.state;

    const lastItemIndex = images.length - frameSize;

    this.setState({
      currentIndex: currentIndex + step > lastItemIndex
        ? lastItemIndex
        : currentIndex + step,
    });

    if (currentIndex === lastItemIndex && infinite) {
      this.setState({
        currentIndex: 0,
      });
    }
  };

  handlePrevBtn = () => {
    const {
      step,
      frameSize,
      images,
      infinite,
    } = this.props;
    const { currentIndex } = this.state;

    const firstItemIndex = 0;

    this.setState({
      currentIndex: currentIndex - step > firstItemIndex
        ? currentIndex - step
        : firstItemIndex,
    });

    if (currentIndex === firstItemIndex && infinite) {
      this.setState({
        currentIndex: images.length - frameSize,
      });
    }
  };

  render(): React.ReactNode {
    const { currentIndex } = this.state;
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const prevDisabled = currentIndex === 0 && !infinite;
    const nextDisabled = currentIndex === images.length - frameSize
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
              style={{ transform: `translateX(-${currentIndex * itemWidth}px)`, transition: `${animationDuration}ms` }}
            >
              <img
                src={img}
                alt={`${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={this.handlePrevBtn}
          disabled={prevDisabled}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={this.handleNextBtn}
          disabled={nextDisabled}
        >
          Next
        </button>
      </div>
    );
  }
}
