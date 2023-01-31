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
  transform: number;
};

export class Carousel extends Component <Props, State> {
  state: Readonly<State> = {
    transform: 0,
  };

  slideRight = () => {
    const {
      step,
      itemWidth,
      frameSize,
      images,
      infinite,
    } = this.props;

    const maxPossibleMove = (images.length - frameSize) * itemWidth;

    if (infinite && this.state.transform === -maxPossibleMove) {
      this.setState({
        transform: (frameSize * itemWidth),
      });
    }

    this.setState(prevState => ({
      transform: (prevState.transform - (step * itemWidth)) <= -maxPossibleMove
        ? -maxPossibleMove
        : (prevState.transform - (step * itemWidth)),
    }));
  };

  slideLeft = () => {
    const {
      step,
      itemWidth,
      images,
      infinite,
    } = this.props;

    if (infinite && this.state.transform >= 0) {
      this.setState({
        transform: -(images.length * itemWidth),
      });
    }

    this.setState(prevState => ({
      transform: (prevState.transform + (step * itemWidth)) > 0
        ? 0
        : (prevState.transform + (step * itemWidth)),
    }));
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { transform } = this.state;
    const widthOfVisible = itemWidth * frameSize;
    const sizeOfHidden = (images.length - frameSize) * itemWidth;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${widthOfVisible}px`,
            transform: `translateX(${transform}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={image}
            >
              <img
                src={image}
                alt={`emoji ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            onClick={this.slideLeft}
            disabled={transform === 0 && !infinite}
          >
            {'<'}
          </button>

          <button
            data-cy="next"
            type="button"
            className="Carousel__button"
            onClick={this.slideRight}
            disabled={transform === -sizeOfHidden
              && !infinite}
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}
