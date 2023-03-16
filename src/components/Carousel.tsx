import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

type State = {
  currentPosition: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    currentPosition: 0,
  };

  moveCarousel = (moveNext: boolean) => {
    const { currentPosition } = this.state;
    const {
      images,
      step,
      frameSize,
      itemWidth,
    } = this.props;

    const maxTransform = (images.length - frameSize) * itemWidth;

    let needMove = moveNext
      ? currentPosition + step * itemWidth
      : currentPosition - step * itemWidth;

    if (needMove >= maxTransform) {
      needMove = maxTransform;
    }

    if (needMove < 0) {
      needMove = 0;
    }

    this.setState({ currentPosition: needMove });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { currentPosition } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms`,
            transform: `translateX(-${currentPosition}px)`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={index.toString()}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            disabled={this.state.currentPosition <= 0}
            onClick={() => this.moveCarousel(false)}
          >
            Prev
          </button>

          <button
            type="button"
            className="Carousel__button"
            data-cy="next"
            onClick={() => this.moveCarousel(true)}
            disabled={this.state.currentPosition
              >= (images.length - frameSize) * itemWidth}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
