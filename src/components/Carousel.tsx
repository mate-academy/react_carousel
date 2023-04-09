import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  itemWidth: number,
  frameSize: number,
  scrollPosition: number,
  animationDuration: number,
  moveLeft(): void,
  moveRight(): void,
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  scrollPosition,
  animationDuration,
  moveLeft,
  moveRight,
}) => (
  <div className="Carousel">
    <div
      className="Carousel__container"
      style={{ width: `${frameSize * itemWidth}px` }}
    >
      <ul
        className="Carousel__list"
        style={{ transform: `translate(${scrollPosition}px, 0)`, transition: `transform ${animationDuration}ms` }}
      >
        {images.map((image, index) => (
          <li key={image}>
            <img
              src={`${image}`}
              alt={`${index}`}
              style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>
    </div>

    <div
      className="Carousel__button-container"
      style={{ width: `${frameSize * itemWidth}px` }}
    >
      <button
        className="Carousel__button"
        type="button"
        data-cy="prev"
        onClick={moveLeft}
      >
        Prev
      </button>
      <button
        className="Carousel__button"
        type="button"
        data-cy="next"
        onClick={moveRight}
      >
        Next
      </button>
    </div>
  </div>
);

export default Carousel;
