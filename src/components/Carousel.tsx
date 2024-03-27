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

  const carouselWidth = frameSize * itemWidth + (frameSize - 1);

  const prevButton = () => {
    if (infinite && current === 0) {
      setCurrent(images.length - frameSize);
    } else {
      setCurrent(prevCurrent => Math.max(0, prevCurrent - step));
    }
  };

  const nextButton = () => {
    if (infinite && current >= images.length - frameSize) {
      setCurrent(0);
    } else {
      setCurrent(prevCurren =>
        Math.min(images.length - frameSize, prevCurren + step),
      );
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${carouselWidth}px` }}
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
