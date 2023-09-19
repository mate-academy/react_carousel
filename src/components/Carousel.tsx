import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [movingCarousel, setMovingCarousel] = useState(0);

  const clickInPrev = () => {
    if (movingCarousel - step > 0) {
      setMovingCarousel(Math.max(movingCarousel - step, 0));
    } else {
      setMovingCarousel(0);
    }

    if (!movingCarousel && infinite) {
      setMovingCarousel(images.length - frameSize);
    }
  };

  const clickInNext = () => {
    if (movingCarousel + step < images.length - frameSize) {
      setMovingCarousel(Math.min(movingCarousel
        + step, images.length - frameSize));
    } else {
      setMovingCarousel(images.length - frameSize);
    }

    if (movingCarousel === images.length - frameSize && infinite) {
      setMovingCarousel(0);
    }
  };

  return (
    <>
      <div
        className="Carousel"
      >
        <ul
          style={
            {
              transition: `${animationDuration}ms`,
              width: `${frameSize * itemWidth}px`,
            }
          }
          className="Carousel__list"
        >
          {
            images.map((image, index) => (
              <li
                key={image}
                style={
                  {
                    transition: `${animationDuration}ms`,
                    transform: `translateX(${-movingCarousel * itemWidth}px)`,
                  }
                }
              >
                <img
                  src={`${image}`}
                  alt={`${index + 1}`}
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            ))
          }
        </ul>

        <div className="Carousel__buttons-container">
          <button
            type="button"
            className={!movingCarousel && !infinite
              ? 'button button--prev disabled'
              : 'button button--prev'}
            onClick={clickInPrev}
            disabled={!movingCarousel && !infinite}
          >
            Prev
          </button>

          <button
            type="button"
            className={movingCarousel === images.length - frameSize && !infinite
              ? 'button button--next disabled'
              : 'button button--next'}
            onClick={clickInNext}
            disabled={movingCarousel === images.length - frameSize && !infinite}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
