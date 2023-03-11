import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  currentIndex: number;
};

enum MoveDirection {
  LEFT,
  RIGHT,
}

export class Carousel extends Component<Props, State> {
  state = {
    currentIndex: 0,
  };

  maxIndex = this.props.images.length - this.props.frameSize;

  move = (direction: MoveDirection) => {
    const {
      step,
      infinite,
    } = this.props;

    const nextStep = direction === MoveDirection.LEFT
      ? this.state.currentIndex - step
      : this.state.currentIndex + step;

    const isEnouphPlace = direction === MoveDirection.LEFT
      ? (nextStep) >= 0
      : this.maxIndex >= (nextStep);

    const isInfiniteNeeded = infinite && direction === MoveDirection.LEFT
      ? this.state.currentIndex === 0
      : this.state.currentIndex === this.maxIndex;

    if (isInfiniteNeeded) {
      this.setState({
        currentIndex: direction === MoveDirection.LEFT
          ? this.maxIndex
          : 0,
      });

      return;
    }

    if (isEnouphPlace) {
      this.setState({ currentIndex: nextStep });

      return;
    }

    this.setState({
      currentIndex: direction === MoveDirection.LEFT
        ? 0
        : this.maxIndex,
    });
  };

  render() {
    const {
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    return (
      <>
        <div
          className="Carousel"
          style={{
            width: `${frameSize * itemWidth}px`,
            transition: `${animationDuration}ms`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${-this.state.currentIndex * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {
              this.props.images.map((image) => {
                const imageId = parseInt(image.slice(6), 10);

                return (
                  <li key={imageId}>
                    <img
                      src={image}
                      alt={`${imageId}`}
                      width={itemWidth}
                    />
                  </li>
                );
              })
            }
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            onClick={() => this.move(MoveDirection.LEFT)}
            disabled={this.state.currentIndex === 0 && !infinite}
          >
            Prev
          </button>

          <button
            className="Carousel__button Carousel__button--next"
            type="button"
            data-cy="next"
            onClick={() => this.move(MoveDirection.RIGHT)}
            disabled={this.state.currentIndex === this.maxIndex && !infinite}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}
