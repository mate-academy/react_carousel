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

  switchPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      infinite,
    } = this.props;

    const { currentTarget } = e;
    let { position } = this.state;
    const isEnd = -itemWidth * (images.length - frameSize);

    if (currentTarget.textContent === 'Next') {
      position -= itemWidth * step;
      position = Math.max(position, isEnd);

      if (infinite && this.state.position === isEnd) {
        position = 0;
      }
    }

    if (currentTarget.innerText === 'Prev') {
      position += itemWidth * step;
      position = Math.min(position, 0);

      if (infinite && this.state.position === 0) {
        position = isEnd;
      }
    }

    this.setState({ position });
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

        <div style={{ width: '100%', height: '25px' }}>
          <button
            className="button prev"
            type="button"
            onClick={this.switchPosition}
            disabled={position === 0 && !infinite}
          >
            Prev
          </button>

          <button
            className="button next"
            type="button"
            onClick={this.switchPosition}
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
