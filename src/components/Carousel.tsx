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
  const [startImage, setStartImage] = useState(1);

  const lastVisible = images.length - frameSize + 1;
  const isCarouselStart = startImage === 1;
  const isCarouselEnd = startImage === lastVisible;
  const translateValue = itemWidth * (startImage - 1);

  const scrollForward = () => {
    if (!isCarouselEnd) {
      const nextStartImg = startImage + step;

      setStartImage(nextStartImg > lastVisible
        ? lastVisible
        : nextStartImg);
    } else if (infinite) {
      setStartImage(1);
    }
  };

  const scrollBack = () => {
    if (!isCarouselStart) {
      const nextStartImg = startImage - step;

      setStartImage(nextStartImg < 1
        ? 1
        : nextStartImg);
    } else if (isCarouselStart && infinite) {
      setStartImage(lastVisible);
    }
  };

  return (
    <>
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{ width: frameSize * itemWidth }}
        >
          {images.map((img) => (
            <li
              key={img}
              style={{
                transform: `translateX(-${translateValue}px)`,
                transition: `transform ${animationDuration}ms ease`,
              }}
            >
              <img
                src={img}
                alt={img}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            disabled={isCarouselStart && !infinite}
            className="Carousel__button"
            onClick={scrollBack}
          >
            {'<'}
          </button>
          <button
            data-cy="next"
            type="button"
            disabled={isCarouselEnd && !infinite}
            className="Carousel__button"
            onClick={scrollForward}
          >
            {'>'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
