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
  state = {
    currentIndex: 0,
  };

  maxIndex = this.props.images.length - this.props.frameSize;

  moveRight = () => {
    const {
      step,
      infinite,
    } = this.props;

    const nextStep = this.state.currentIndex + step;
    const isEnouphPlace = this.maxIndex >= (nextStep);

    if (infinite && this.state.currentIndex === this.maxIndex) {
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
    } = this.props;

    return (
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

        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            onClick={this.moveLeft}
            disabled={this.state.currentIndex === 0 && !infinite}
          >
            Prev
          </button>

          <button
            className="Carousel__button Carousel__button--next"
            type="button"
            data-cy="next"
            onClick={this.moveRight}
            disabled={this.state.currentIndex === this.maxIndex && !infinite}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
