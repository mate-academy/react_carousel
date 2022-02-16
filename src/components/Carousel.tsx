import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  currentIndex: number,
  maxIndex: number,
};

class Carousel extends React.Component<Props, State> {
  state: State = {
    currentIndex: 0,
    maxIndex: Math.floor(this.props.images.length / this.props.step),
  };

  next() {
    const { currentIndex, maxIndex } = this.state;

    if (currentIndex === maxIndex) {
      return 0;
    }

    return currentIndex + 1;
  }

  prev() {
    const { currentIndex, maxIndex } = this.state;

    if (currentIndex === 0) {
      return maxIndex;
    }

    return currentIndex - 1;
  }

  translate() {
    const { images, frameSize, step } = this.props;
    const maxTransform = (-100 * (images.length - frameSize))
      / frameSize;
    const currentTransform = (-100 / frameSize) * this.state.currentIndex
      * step;

    if (currentTransform < maxTransform) {
      return `translateX(${maxTransform}%)`;
    }

    return `translateX(${currentTransform}%)`;
  }

  renderNext() {
    if (!this.props.infinite) {
      return this.state.currentIndex !== this.state.maxIndex;
    }

    return true;
  }

  renderPrev() {
    if (!this.props.infinite) {
      return this.state.currentIndex !== 0;
    }

    return true;
  }

  render() {
    const { itemWidth, frameSize, images } = this.props;

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{ transform: this.translate() }}
        >
          {images.map(imageUrl => (
            <li key={imageUrl} className="Carousel__item">
              <img
                src={imageUrl}
                alt={imageUrl}
                width={itemWidth}
                className="Carousel__img"
              />
            </li>
          ))}
        </ul>

        {this.renderPrev()
          && (
            <button
              type="button"
              onClick={() => this.setState({ currentIndex: this.prev() })}
            >
              Prev
            </button>
          )}
        {this.renderNext()
          && (
            <button
              type="button"
              onClick={() => this.setState({ currentIndex: this.next() })}
            >
              Next
            </button>
          )}

      </div>
    );
  }
}

export default Carousel;
