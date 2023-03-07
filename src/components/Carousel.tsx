/* eslint-disable prefer-const */
import classNames from 'classnames';
import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[]
  step: number
  frameSize: number
  itemWidth: number
  animationDuration: number
  infinite: boolean;
};

type State = {
  scroll: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
  };

  handleButton = (step: number) => () => {
    let {
      images,
      itemWidth,
      frameSize,
      infinite,
    } = this.props;
    let { scroll } = this.state;
    const scrollLength = itemWidth * (images.length - frameSize);
    let scrollCount = itemWidth * step;
    let nextScroll = scroll + scrollCount;

    if (step < 0) {
      if (nextScroll < 0) {
        nextScroll = 0;
      }

      if (scroll === 0 && infinite) {
        nextScroll = scrollLength;
      }
    }

    if (step > 0) {
      if (nextScroll > scrollLength) {
        nextScroll = scrollLength;
      }

      if (scroll === scrollLength && infinite) {
        nextScroll = 0;
      }
    }

    this.setState({ scroll: nextScroll });
  };

  render() {
    let {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.props;

    let { scroll } = this.state;
    const endScroll = scroll === itemWidth * (images.length - frameSize)
      && !infinite;
    const startScroll = scroll === 0 && !infinite;

    const styleForItem = {
      transform: `translate(-${scroll}px)`,
      transition: `all ${animationDuration}ms`,
    };

    const styleForImage = {
      width: `${itemWidth}px`,
      transition: `all ${animationDuration}ms`,
    };

    const widthForView = {
      width: itemWidth * frameSize,
    };

    return (
      <div className="Carousel">
        <ul
          style={widthForView}
          className={classNames(
            'Carousel__list',
            {
              'Carousel__list--left': startScroll,
              'Carousel__list--right': endScroll,
            },
          )}
        >
          {images.map((image, index) => (
            <li
              key={image}
              style={styleForItem}
              className="Carousel__item"
            >
              <img
                style={styleForImage}
                className="Carousel__image"
                src={image}
                alt={`smille№${index + 1}`}
              />
            </li>
          ))}
        </ul>

        <div className="Button__container">
          <button
            data-cy="prev"
            type="button"
            disabled={startScroll}
            className="Button"
            onClick={this.handleButton(-step)}
          >
            Prev
          </button>
          <button
            data-cy="next"
            type="button"
            disabled={endScroll}
            className="Button"
            onClick={this.handleButton(step)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
