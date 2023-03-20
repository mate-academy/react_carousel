import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  step: number;
  infinite: boolean;
};

type State = {
  position: number;
};

class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    position: 0, // position of our scroll bar
  };

  switchPosition = (direction: string) => {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      infinite,
    } = this.props;

    const { position } = this.state;
    let pos = position;
    const isEnd = -itemWidth * (images.length - frameSize);

    if (direction === 'next') {
      pos -= itemWidth * step;
      pos = Math.max(pos, isEnd);

      if (infinite && this.state.position === isEnd) {
        pos = 0;
      }
    }

    if (direction === 'prev') {
      pos += itemWidth * step;
      pos = Math.min(pos, 0);

      if (infinite && this.state.position === 0) {
        pos = isEnd;
      }
    }

    this.setState({ position: pos });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      infinite,
      animationDuration,
    } = this.props;

    const { position } = this.state;
    const isEnd = -itemWidth * (images.length - frameSize);

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `${animationDuration}ms`,
            transform: `translateX(${position}px)`,
            width: `${itemWidth * images.length}px`,
          }}
        >
          {images.map(img => {
            const name = img.slice(-5, -4);

            return (
              <li
                style={{ height: `${itemWidth}px`, width: `${itemWidth}px` }}
                key={name}
                className="Carousel__item"
              >
                <img
                  src={img}
                  alt={name}
                  height={`${itemWidth}px`}
                />
              </li>
            );
          })}
        </ul>

        <div className="button__wrapper">
          <button
            className="button prev"
            type="button"
            onClick={() => this.switchPosition('prev')}
            disabled={position === 0 && !infinite}
          >
            Prev
          </button>

          <button
            className="button next"
            type="button"
            onClick={() => this.switchPosition('next')}
            data-cy="next"
            disabled={position === isEnd && !infinite}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
