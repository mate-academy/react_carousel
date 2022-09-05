import { Component, CSSProperties } from 'react';
import uuid from 'react-uuid';
import classNames from 'classnames';

import { getFrameSize } from './helpers';

import CarouselType from '../../types/CarouselType';

import './Carousel.scss';

type Props = CarouselType;

type State = {
  firstItemIndex: number,
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    firstItemIndex: 0,
  };

  getCurrentOffset = () => {
    const { firstItemIndex } = this.state;
    const {
      itemWidth,
      itemGap,
    } = this.props;

    return firstItemIndex * (itemWidth + itemGap);
  };

  getPrevButtonEnabled = () => {
    const { firstItemIndex } = this.state;
    const { images, infinite } = this.props;

    return infinite
      || (firstItemIndex !== 0 && images.length > getFrameSize(this.props));
  };

  getNextButtonEnabled = () => {
    const { firstItemIndex } = this.state;
    const { images, infinite } = this.props;

    return infinite
      || (firstItemIndex !== images.length - getFrameSize(this.props));
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
        <div className="Carousel__list-wrapper">
          <ul
            className="Carousel__list"
            style={listStyle}
          >
            {images.map((image, index) => (
              <li
                className="Carousel__item"
                key={uuid()}
              >
                <img
                  src={image}
                  width={itemWidth}
                  alt={`${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__controls">
          <button
            className={
              classNames(
                'Carousel__button',
                'Carousel__button--prev',
                {
                  'Carousel__button--disabled': !this.getPrevButtonEnabled(),
                },
              )
            }
            type="button"
            onClick={this.handlePrev}
          >
            &larr;
          </button>
          <button
            className={
              classNames(
                'Carousel__button',
                'Carousel__button--next',
                {
                  'Carousel__button--disabled': !this.getNextButtonEnabled(),
                },
              )
            }
            type="button"
            data-cy="next"
            onClick={this.handleNext}
          >
            &rarr;
          </button>
        </div>
      </div>
    );
  }
}
