import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  transformX: number,
  nextTransform: () => void,
  prevTransform:() => void,
};

class Carousel extends React.PureComponent<Props, {}> {
  render() {
    const {
      images,
      itemWidth,
      step,
      animationDuration,
      frameSize,
      transformX,
      nextTransform,
      prevTransform,
    } = this.props;

    const itemSize = {
      width: `${itemWidth}px`,
      height: `${itemWidth}px`,
    };

    const totalConteinerWidth = itemWidth * images.length;

    const transform = {
      transform: `translateX(${transformX}px)`,
      transition: `${animationDuration}ms`,
    };

    const stepWidth = step * itemWidth;

    return (
      <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
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
            onClick={prevTransform}
            disabled={stepWidth + transformX > 0}
          >
            Prev
          </button>
          <button
            className="Carousel__button Carousel__button--next"
            type="button"
            data-cy="next"
            onClick={nextTransform}
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
