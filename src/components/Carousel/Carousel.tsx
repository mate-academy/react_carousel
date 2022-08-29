import { Component, CSSProperties } from 'react';
import CarouselType from '../../types/CarouselType';

import './Carousel.scss';

type Props = CarouselType;

type State = {
  firstItemIndex: number,
};

const getFrameSize = (props: Props): number => {
  const {
    frameSize,
    itemWidth,
    itemGap,
    carouselMaxWidth,
  } = props;
  const maxFrames = Math.floor(
    (carouselMaxWidth + itemGap) / (itemWidth + itemGap),
  );

  return frameSize <= maxFrames ? frameSize : maxFrames;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    firstItemIndex: 1,
  };

  getRandomKey = (index = 0) => (
    Math.trunc(Date.now() * Math.random()) + index
  );

  getCurrentOffset = () => {
    const { firstItemIndex } = this.state;
    const {
      itemWidth,
      itemGap,
    } = this.props;

    return firstItemIndex * (itemWidth + itemGap);
  };

  handleNext = () => this.setState((prevSate) => {
    const { firstItemIndex } = prevSate;
    const {
      images,
      step,
      infinite,
    } = this.props;
    const frameSize = getFrameSize(this.props);
    const minItemIndex = images.length >= frameSize
      ? images.length - frameSize
      : 0;
    let nextIndex = firstItemIndex + step;

    if (nextIndex > images.length - frameSize && infinite) {
      nextIndex = 0;
    }

    const nextItemIndex = nextIndex <= minItemIndex
      ? nextIndex
      : minItemIndex;

    return {
      firstItemIndex: nextItemIndex,
    };
  });

  handlePrev = () => this.setState((prevSate) => {
    const { firstItemIndex } = prevSate;
    const {
      images,
      step,
      infinite,
    } = this.props;
    const minItemIndex = 0;
    const frameSize = getFrameSize(this.props);
    let prevIndex = firstItemIndex - step;

    if (prevIndex < 0 && infinite) {
      prevIndex = images.length - frameSize;
      prevIndex = prevIndex >= 0 ? prevIndex : 0;
    }

    const prevItemIndex = prevIndex >= minItemIndex
      ? prevIndex
      : minItemIndex;

    return {
      firstItemIndex: prevItemIndex,
    };
  });

  render() {
    const {
      images,
      // step,
      itemWidth,
      itemGap,
      carouselMaxWidth,
      animationDuration,
    } = this.props;
    const frameSize = getFrameSize(this.props);

    const carouselStyle: CSSProperties = {
      maxWidth: carouselMaxWidth,
      width: (itemWidth + itemGap) * frameSize - itemGap,
    };

    const listStyle: CSSProperties = {
      transitionDuration: `${animationDuration}ms`,
      transform: `translateX(-${this.getCurrentOffset()}px)`,
    };

    return (
      <div
        className="Carousel"
        style={carouselStyle}
      >
        <ul
          className="Carousel__list"
          style={listStyle}
        >
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              key={this.getRandomKey(index)}
            >
              <img
                src={image}
                width={itemWidth}
                alt={`${index}`}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={this.handlePrev}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={this.handleNext}
        >
          Next
        </button>
      </div>
    );
  }
}
