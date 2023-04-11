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
  position: number;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    position: 0,
  };

  handleNextImage = (step: number): void => {
    const { position } = this.state;
    const { images, frameSize, infinite } = this.props;

    const newPosition = position - step;
    const maxPosition = images.length - frameSize;

    if (position === -maxPosition && infinite) {
      this.setState({ position: 0 });

      return;
    }

    if (-newPosition > maxPosition) {
      this.setState({ position: -maxPosition });
    } else {
      this.setState({ position: newPosition });
    }
  };

  handlePrevImage = (step: number): void => {
    const { position } = this.state;
    const { images, frameSize, infinite } = this.props;

    const newPosition = position + step;
    const maxPosition = images.length - frameSize;

    if (position === 0 && infinite) {
      this.setState({ position: -maxPosition });

      return;
    }

    if (newPosition > 0) {
      this.setState({ position: 0 });
    } else {
      this.setState({ position: newPosition });
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${frameSize * itemWidth}px`,
            transition: `width ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
              style={{
                transition: `transform ${animationDuration}ms`,
                transform: `translateX(${position * itemWidth}px)`,
              }}
            >
              <img
                src={image}
                alt={`${index}`}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <button
          className="Carousel__button"
          type="button"
          data-cy="prev"
          onClick={() => this.handlePrevImage(step)}
          disabled={position >= 0 && !infinite}
        >
          &#8249;
        </button>

        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={() => this.handleNextImage(step)}
          disabled={-position >= images.length - frameSize && !infinite}
        >
          &#8250;
        </button>
      </div>
    );
  }
}
