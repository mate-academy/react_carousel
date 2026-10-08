import React from 'react';
import './Carousel.scss';

const defaultSettings = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
  animationDuration: 1000,
  infinite: false,
};

type Props = {
  images: string[];
} & typeof defaultSettings;

type State = {
  currentIndex: number;
};

class Carousel extends React.Component<Props, State> {
  static defaultProps = defaultSettings;

  state: State = {
    currentIndex: 0,
  };

  getMaxIndex = () => {
    const { images, frameSize } = this.props;

    return Math.max(images.length - frameSize, 0);
  };

  getCurrentIndex = () => {
    return Math.min(this.state.currentIndex, this.getMaxIndex());
  };

  previousSlide = () => {
    const { step, infinite } = this.props;
    const maxIndex = this.getMaxIndex();

    this.setState(({ currentIndex }) => {
      const safeIndex = Math.min(currentIndex, maxIndex);
      const previousIndex = safeIndex - step;

      if (previousIndex >= 0) {
        return { currentIndex: previousIndex };
      }

      if (!infinite || safeIndex > 0) {
        return { currentIndex: 0 };
      }

      return { currentIndex: maxIndex };
    });
  };

  nextSlide = () => {
    const { step, infinite } = this.props;
    const maxIndex = this.getMaxIndex();

    this.setState(({ currentIndex }) => {
      const safeIndex = Math.min(currentIndex, maxIndex);
      const nextIndex = safeIndex + step;

      if (nextIndex <= maxIndex) {
        return { currentIndex: nextIndex };
      }

      if (!infinite || safeIndex < maxIndex) {
        return { currentIndex: maxIndex };
      }

      return { currentIndex: 0 };
    });
  };

  render() {
    const { images, itemWidth, frameSize, animationDuration, infinite } =
      this.props;
    const currentIndex = this.getCurrentIndex();
    const maxIndex = this.getMaxIndex();
    const translateX = currentIndex * itemWidth;
    const hasHiddenImages = maxIndex > 0;

    return (
      <div className="carousel">
        <div className="carousel__wrapper">
          <button
            type="button"
            className="btn btn--prev"
            disabled={!hasHiddenImages || (!infinite && currentIndex <= 0)}
            onClick={this.previousSlide}
          >
            &#10148;
          </button>

          <div
            className="carousel__container"
            style={{ width: `${frameSize * itemWidth}px` }}
          >
            <ul
              className="carousel__list"
              style={{
                width: `${images.length * itemWidth}px`,
                transform: `translateX(${-translateX}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
            >
              {images.map(image => (
                <li key={image} className="carousel__item">
                  <img
                    src={image}
                    alt="smile"
                    className="carousel__img"
                    width={itemWidth}
                  />
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="btn btn--next"
            data-cy="next"
            disabled={
              !hasHiddenImages || (!infinite && currentIndex >= maxIndex)
            }
            onClick={this.nextSlide}
          >
            &#10148;
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
