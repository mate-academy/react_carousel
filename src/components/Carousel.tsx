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
  startValue: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  componentDidUpdate(prevProps: Props) {
    const { startValue, step } = this.props;
    const { position } = this.state;

    if (startValue > position) {
      if (prevProps.startValue !== startValue) {
        this.moveRight(step, startValue);
      }
    }
  }

  moveRight = (step: number, startValue: number) => {
    this.setState((prevState: State) => {
      const currentPosition = prevState.position + (-100 * step);

      if (startValue >= currentPosition) {
        return {
          position: startValue,
        };
      }

      return {
        position: currentPosition,
      };
    });
  };

  moveLeft = (step: number) => {
    this.setState((prevState: State) => {
      const currentPosition = prevState.position + (100 * step);

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
      startValue,
    } = this.props;

    const { position } = this.state;

    return (
      <>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{
              width: `${itemWidth * frameSize}px`,
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
          disabled={startValue >= this.state.position}
          onClick={() => this.moveRight(step, startValue)}
        >
          Next
        </button>
      </>
    );
  }
}

export default Carousel;
