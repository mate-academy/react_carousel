/* eslint-disable react/no-access-state-in-setstate */
import './Carousel.scss';
import { Component } from 'react';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;

};

type State = {
  start: number;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    start: 0,
  };

  clickNext = () => {
    const {
      step,
      itemWidth,
      frameSize,
      images,
      infinite,
    } = this.props;

    const maxTransition = (images.length * itemWidth) - (frameSize * itemWidth);

    if (infinite && this.state.start <= -maxTransition) {
      this.setState({
        start: (this.state.start) === -maxTransition
          ? 0
          : (frameSize * itemWidth),
      });

      return;
    }

    this.setState(state => ({
      start: (state.start - (step * itemWidth)) < -maxTransition
        ? -maxTransition
        : (state.start - (step * itemWidth)),
    }));
  };

  clickPrev = () => {
    const {
      step,
      itemWidth,
      frameSize,
      images,
      infinite,
    } = this.props;

    const maxTransition = (images.length * itemWidth)
      - (frameSize * itemWidth) + (step * itemWidth);

    if (infinite && this.state.start >= 0) {
      this.setState({
        start: (this.state.start) === 0
          ? -maxTransition
          : -(images.length * itemWidth),
      });
    }

    this.setState(state => ({
      start: (state.start + (step * itemWidth)) > 0
        ? 0
        : (state.start + (step * itemWidth)),
    }));
  };

  render() {
    const { start } = this.state;
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
    } = this.props;

    return (
      <div className="Carousel">
        <div
          className="Carousel__wrapper"
          style={{ width: itemWidth * frameSize }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translate(${start}px)`, transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map(image => (
              <li
                style={{ height: itemWidth }}
                key={image}
                className="Carousel__item"
              >
                <img
                  style={{ width: itemWidth }}
                  src={image}
                  alt={image.slice(image.lastIndexOf('/') + 1, -4)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button"
            type="button"
            onClick={this.clickPrev}
          >
            Prev
          </button>

          <button
            className="Carousel__button"
            type="button"
            onClick={this.clickNext}
            data-cy="next"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
