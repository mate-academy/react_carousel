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

export class Carousel extends Component<Props, State> {
  readonly state = {
    currentIndex: 0,
  };

  maxIndex = this.props.images.length - this.props.step;

  moveRight = () => {
    const {
      step,
      infinite,
    } = this.props;

    const {
      currentIndex,
    } = this.state;

    const nextStep = currentIndex + step;
    const isEnouphPlace = this.maxIndex >= (nextStep);

    if (infinite && currentIndex === this.maxIndex) {
      this.setState({ currentIndex: 0 });

      return;
    }

    if (isEnouphPlace) {
      this.setState({ currentIndex: nextStep });

      return;
    }

    this.setState({ currentIndex: this.maxIndex });
  };

  moveLeft = () => {
    const {
      step,
      infinite,
    } = this.props;

    const nextStep = this.state.currentIndex - step;
    const isEnouphPlace = (nextStep) >= 0;

    if (infinite && this.state.currentIndex === 0) {
      this.setState({ currentIndex: this.maxIndex });

      return;
    }

    if (isEnouphPlace) {
      this.setState({ currentIndex: nextStep });

      return;
    }

    this.setState({ currentIndex: 0 });
  };

  render() {
    const {
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
      images,
      step,
    } = this.props;

    const { currentIndex } = this.state;

    const getCurrentPosition = () => {
      const positionIndex = frameSize >= step && currentIndex > step
        ? -currentIndex + frameSize - step
        : -currentIndex;

      return positionIndex * itemWidth;
    };

    const isPrevButtonEnabled = currentIndex !== 0 || infinite;
    const isNextButtonEnabled = currentIndex !== this.maxIndex || infinite;
    const frameWidth = frameSize * itemWidth;
    const itemPosition = getCurrentPosition();

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameWidth}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${itemPosition}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => {
            return (
              <li key={image}>
                <img
                  src={image}
                  alt={`${index + 1}`}
                  width={itemWidth}
                />
              </li>
            );
          })}
        </ul>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            onClick={this.moveLeft}
            disabled={!isPrevButtonEnabled}
          >
            Prev
          </button>

          <button
            className="Carousel__button Carousel__button--next"
            type="button"
            data-cy="next"
            onClick={this.moveRight}
            disabled={!isNextButtonEnabled}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
