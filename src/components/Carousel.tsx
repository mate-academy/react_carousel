import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidt: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  isInfinite: boolean,
};

type State = {
  scrollingWidth: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    scrollingWidth: 0,
    prevButtonDisabled: false,
    nextButtonDisabled: false,
  };

  prevButton = () => {
    const {
      step,
      itemWidt,
      isInfinite,
      images,
      frameSize,
    } = this.props;

    this.setState((prevState) => {
      const maxScrolling = (images.length - frameSize) * itemWidt;
      const scrolled = prevState.scrollingWidth - (step * itemWidt);

      if (isInfinite) {
        if (scrolled >= 0) {
          return {
            scrollingWidth: scrolled,
            nextButtonDisabled: false,
          };
        }

        return {
          scrollingWidth: maxScrolling,
          prevButtonDisabled: false,
        };
      }

      if (scrolled > 0) {
        return {
          scrollingWidth: scrolled,
          nextButtonDisabled: false,
        };
      }

      return {
        scrollingWidth: 0,
        prevButtonDisabled: true,
      };
    });
  };

  nextButton = () => {
    const {
      images,
      step,
      itemWidt,
      frameSize,
      isInfinite,
    } = this.props;

    this.setState((prevState) => {
      const maxScrolling = (images.length - frameSize) * itemWidt;
      const scrolled = prevState.scrollingWidth + (step * itemWidt);

      if (isInfinite) {
        if (scrolled <= maxScrolling) {
          return {
            scrollingWidth: scrolled,
            prevButtonDisabled: false,
          };
        }

        return {
          scrollingWidth: 0,
          nextButtonDisabled: false,
        };
      }

      if (scrolled < maxScrolling) {
        return {
          scrollingWidth: scrolled,
          prevButtonDisabled: false,
        };
      }

      return {
        scrollingWidth: maxScrolling,
        nextButtonDisabled: true,
      };
    });
  };

  render() {
    const {
      animationDuration,
      images,
      itemWidt,
      frameSize,
    } = this.props;

    const {
      scrollingWidth,
      prevButtonDisabled,
      nextButtonDisabled,
    } = this.state;

    return (
      <>
        <div
          className="carousel"
          style={{
            width: `${frameSize * itemWidt}px`,
          }}
        >
          <ul
            className="carousel__list"
            style={{
              transform: `translateX(${-scrollingWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            {images.map((image) => (
              <li
                className="carousel__item"
                key={image}
                style={{
                  width: `${itemWidt}px`,
                }}
              >
                <img
                  className="carousel__img"
                  src={image}
                  alt={image}
                  style={{
                    width: `${itemWidt}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons">
          <button
            className="btn btn-secondary btn-lg"
            type="button"
            disabled={prevButtonDisabled}
            onClick={this.prevButton}
          >
            Prev
          </button>

          <button
            className="btn btn-secondary btn-lg"
            type="button"
            disabled={nextButtonDisabled}
            onClick={this.nextButton}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

export default Carousel;
