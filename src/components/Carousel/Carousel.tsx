import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number,
  frameSize: number,
  imageSize: number,
  animationDuration: number,
};

type State = {
  scroll: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
    nextButtonDis: false,
    prevButtonDis: false,
  };

  prevButton = () => {
    const { step, imageSize } = this.props;

    this.setState((prevState) => {
      const scrolled = prevState.scroll - (step * imageSize);

      if (scrolled >= 0) {
        return {
          scroll: scrolled,
          nextButtonDis: false,
        };
      }

      return {
        scroll: 0,
        prevButtonDis: true,
      };
    });
  };

  nextButton = () => {
    const {
      images,
      step,
      frameSize,
      imageSize,
    } = this.props;

    this.setState((prevState) => {
      const endOfScroll = (images.length - frameSize) * imageSize;
      const scrolled = prevState.scroll + (step * imageSize);

      if (scrolled <= endOfScroll) {
        return {
          scroll: scrolled,
          prevButtonDis: false,
        };
      }

      return {
        scroll: endOfScroll,
        nextButtonDis: true,
      };
    });
  };

  render() {
    const {
      scroll,
      prevButtonDis,
      nextButtonDis,
    } = this.state;

    const {
      images,
      frameSize,
      imageSize,
      animationDuration,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{ width: `${imageSize * frameSize}px` }}
      >
        <div className="Carousel__container">
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${-scroll}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            {images.map((image) => (
              <li
                key={image}
                className="Carousel__item"
                style={{ width: `${imageSize}px` }}
              >
                <img
                  className="Carousel__image"
                  src={image}
                  alt={image}
                  style={{ width: `${imageSize}px` }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__prevButton Carousel__button"
            disabled={prevButtonDis}
            onClick={this.prevButton}
          >
            {}
          </button>

          <button
            data-cy="next"
            type="button"
            className="Carousel__nextButton Carousel__button"
            disabled={nextButtonDis}
            onClick={this.nextButton}
          >
            {}
          </button>

        </div>
      </div>
    );
  }
}

export default Carousel;
