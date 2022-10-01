import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

type State = {
  scrollWidth: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    scrollWidth: 0,
    nextDisabled: false,
    prevDisabled: true,
  };

  handlePrevBtn = () => {
    const { step, itemWidth } = this.props;

    this.setState((prevState) => {
      const scrolled = prevState.scrollWidth - (step * itemWidth);

      if (scrolled >= 0) {
        return {
          scrollWidth: scrolled,
          nextDisabled: false,
        };
      }

      return {
        scrollWidth: 0,
        prevDisabled: true,
      };
    });
  };

  nextBtn = () => {
    const {
      images,
      step,
      frameSize,
      itemWidth,
    } = this.props;

    this.setState((prevState) => {
      const maxScroll = (images.length - frameSize) * itemWidth;
      const scrolled = prevState.scrollWidth + (step * itemWidth);

      if (scrolled <= maxScroll) {
        return {
          scrollWidth: scrolled,
          prevDisabled: false,
        };
      }

      return {
        scrollWidth: maxScroll,
        nextDisabled: true,
      };
    });
  };

  render() {
    const {
      scrollWidth,
      prevDisabled,
      nextDisabled,
    } = this.state;

    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <div
        className="carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="carousel__list"
          style={{
            transform: `translateX(${-scrollWidth}px)`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map((img) => (
            <li
              key={img}
              className="carousel__item"
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img
                className="carousel__item--image"
                src={img}
                alt={img}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="carousel__buttons">
          <button
            type="button"
            className="carousel__button"
            disabled={prevDisabled}
            onClick={this.handlePrevBtn}
            data-cy="next"
          >
            Prev
          </button>
          <button
            type="button"
            className="carousel__button"
            disabled={nextDisabled}
            onClick={this.nextBtn}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
