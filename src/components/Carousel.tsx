import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [firstImg, setFirstImage] = useState(0);

  function carouselNext() {
    if (firstImg === (images.length - frameSize) && infinite) {
      return setFirstImage(0);
    }

    return setFirstImage((num) => (
      (num + step) <= (images.length - frameSize)
        ? num + step
        : images.length - frameSize
    ));
  }

  function carouselPrev() {
    if (firstImg === 0 && infinite) {
      return setFirstImage(images.length - frameSize);
    }

    return setFirstImage((num) => (
      (num - step) >= 0
        ? num - step
        : frameSize - frameSize
    ));
  }

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * itemWidth}px` }}
    >
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li
            key={image}
            style={{
              transform: `translateX(${-(itemWidth * firstImg)}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              style={{ width: `${itemWidth}px` }}
              src={image}
              alt={`${index + 1}`}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__container">
        <button
          className="Carousel__button"
          disabled={firstImg === 0 && !infinite}
          type="button"
          onClick={() => carouselPrev()}
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          data-cy="next"
          disabled={firstImg === images.length - step && !infinite}
          type="button"
          onClick={() => carouselNext()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
