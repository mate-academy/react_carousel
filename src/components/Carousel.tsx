import React from 'react';
import './Carousel.scss';

type State = {
  position: number,
};

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  maxItemsWidth = () => {
    return (this.props.images.length - this.props.frameSize) * -100;
  };

  moveRight = (step: number) => {
    this.setState((move: State) => {
      const currentPosition = move.position + (-100 * step);

      if (this.maxItemsWidth() >= currentPosition) {
        return {
          position: this.maxItemsWidth(),
        };
      }

      return {
        position: currentPosition,
      };
    });
  };

  moveLeft = (step: number) => {
    this.setState((move: State) => {
      const currentPosition = move.position + (100 * step);

      if (currentPosition > 0) {
        return {
          position: 0,
        };
      }

      return {
        position: currentPosition,
      };
    });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.props;

    const { position } = this.state;

    return (
      <>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{
              width: `${itemWidth * frameSize}px`,
              height: `${itemWidth}px`,
            }}
          >
            {images.map((image) => (
              <li key={image}>
                <img
                  src={image}
                  alt={`${image}`}
                  style={{
                    transform: `translateX(${position}%)`,
                    transition: `${animationDuration}ms`,
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          className="Carousel__button"
          type="button"
          disabled={position >= 0}
          onClick={() => this.moveLeft(step)}
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          data-cy="next"
          type="button"
          disabled={this.maxItemsWidth() >= position}
          onClick={() => this.moveRight(step)}
        >
          Next
        </button>
      </>
    );
  }
}

export default Carousel;
