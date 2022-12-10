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
  maxValue: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.maxValue > this.state.position) {
      if (prevProps.maxValue !== this.props.maxValue) {
        this.moveRight(this.props.step, this.props.maxValue);
      }
    }
  }

  moveRight = (step: number, maxValue: number) => {
    this.setState((prevState: State) => {
      const currentPosition = prevState.position + (100 * step * -1);

      if (maxValue >= currentPosition) {
        return {
          position: maxValue,
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
      maxValue,
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
            {images.map((image, index) => (
              <li key={image}>
                <img
                  src={image}
                  alt={`${index}`}
                  style={{
                    transform: `translate(${position}%)`,
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
          disabled={maxValue >= this.state.position}
          onClick={() => this.moveRight(step, maxValue)}
        >
          Next
        </button>
      </>
    );
  }
}

export default Carousel;
