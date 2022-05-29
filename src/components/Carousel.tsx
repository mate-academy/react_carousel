import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
};

type State = {
  transformX: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    transformX: 0,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.props;

    const { transformX } = this.state;

    const totalConteinerWidth = itemWidth * images.length;

    const carouselWidth = { width: `${itemWidth * frameSize}px` };

    const itemSize = {
      width: `${itemWidth}px`,
      height: `${itemWidth}px`,
    };

    const transform = {
      transform: `translateX(${transformX}px)`,
      animationDuration: `${animationDuration}ms`,
    };

    const changeStyleNext = () => {
      this.setState((prevState) => {
        const transformNext = prevState.transformX - (itemWidth * step);

        return {
          transformX: transformNext,
        };
      });
    };

    const changeStylePrev = () => {
      this.setState((prevState) => {
        const transformNext = prevState.transformX + (itemWidth * step);

        return {
          transformX: transformNext,
        };
      });
    };

    const stepWidth = step * itemWidth;

    return (
      <div className="Carousel" style={carouselWidth}>
        <ul
          className="Carousel__list"
        >
          {images.map((image, i) => {
            return (
              <li
                key={image}
                className="carousel__item"
                style={transform}
              >
                <img
                  src={image}
                  alt={`${i + 1}`}
                  style={itemSize}
                />
              </li>
            );
          })}
        </ul>
        <div className="Carousel__buttons">
          <button
            className="Carousel__button Carousel__button--prev"
            type="button"
            onClick={changeStylePrev}
            disabled={stepWidth + transformX > 0}
          >
            Prev
          </button>
          <button
            className="Carousel__button Carousel__button--next"
            type="button"
            data-cy="next"
            onClick={changeStyleNext}
            disabled={stepWidth - transformX > totalConteinerWidth}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
