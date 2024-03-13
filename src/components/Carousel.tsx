import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [current, setCurrent] = useState(0);

  const prevButton = () => {
    if (infinite) {
      if (current !== 0) {
        return setCurrent(current - step);
      }

      return setCurrent(images.length - 1);
    }

    return setCurrent(current === 1 ? 0 : current - step);
  };

  const nextButton = () => {
    if (infinite) {
      if (current + step < images.length) {
        return setCurrent(current + step);
      }

      return setCurrent(0);
    }

    // return setCurrent(
    //   current + step >= images.length
    //     ? images.length - frameSize
    //     : current + step,
    // );
    return setCurrent(
      current + step >= images.length - step
        ? current + (images.length - current - step)
        : current + step,
    );
  };

  return (
    <div className="Carousel">
      <p>{current}</p>
      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${current * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, index) => (
            <li key={img} className="Carousel__item">
              <img
                className="Carousel__img"
                src={img}
                alt={`${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          disabled={!infinite && current < 1}
          onClick={prevButton}
        >
          Prev
        </button>

        <button
          data-cy="next"
          type="button"
          className="Carousel__button"
          // disabled={!infinite && current + step >= images.length}
          disabled={!infinite && current + frameSize >= images.length}
          onClick={nextButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// export default Carousel;
