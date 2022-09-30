import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  duration: number;
};

type State = {
  scrollWidth: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    scrollWidth: 0,
    nextDisabled: false,
    prevDisabled: false,
  };

  prevBtn = () => {
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
      duration,
    } = this.props;

    return (
      <div
        className="carousel"
        style={{
          width: '400px',
        }}
      >
        <ul
          className="carousel__list"
          style={{
            width: `${itemWidth * frameSize}px`,
            transform: `translateX(${-scrollWidth}px)`,
            transition: `${duration}ms`,
          }}
        >
          {images.map((img) => (
            <li
              key={img}
              className="carousel__item is-block is-responsive"
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <img
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
            /* eslint-disable-next-line max-len */
            className="prevBtn button is-danger is-outlined is-rounded is-responsive"
            disabled={prevDisabled}
            onClick={this.prevBtn}
          >
            Prev
          </button>
          <button
            type="button"
            /* eslint-disable-next-line max-len */
            className="nextBtn button is-black is-outlined is-rounded is-responsive"
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
