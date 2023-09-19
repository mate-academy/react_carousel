import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinity: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinity,
}) => {
  const [movingCarousel, setMovingCarousel] = useState(0);

  const clickInPrev = () => {
    if (movingCarousel - step > 0) {
      setMovingCarousel(Math.max(movingCarousel - step, 0));
    } else {
      setMovingCarousel(0);
    }

    if (movingCarousel === 0
      && infinity) {
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

    if (movingCarousel === images.length - frameSize && infinity) {
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
            className={movingCarousel === 0 && !infinity
              ? 'button button--prev disabled'
              : 'button button--prev'}
            onClick={clickInPrev}
            disabled={movingCarousel === 0 && !infinity}
          >
            Prev
          </button>

          <button
            type="button"
            className={movingCarousel === images.length - frameSize && !infinity
              ? 'button button--next disabled'
              : 'button button--next'}
            onClick={clickInNext}
            disabled={movingCarousel === images.length - frameSize && !infinity}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
