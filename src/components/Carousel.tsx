/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef } from 'react';
import './Carousel.scss';

type Props = {
  images: string[]
  frameSize: number
  itemWidth: number
  step: number
  animationDuration: number
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  let positionCounter = 0;
  const lastImages = images.length % frameSize;
  const maxPosCounter = (images.length * itemWidth) - (step * itemWidth);
  const border = maxPosCounter - (lastImages * itemWidth);

  const handleNextClick = () => {
    if (positionCounter === border) {
      positionCounter += lastImages * itemWidth;
    }

    if (positionCounter < maxPosCounter) {
      positionCounter += step * itemWidth;
    }

    wrapperRef.current!.style.transform = `translateX(-${positionCounter}px)`;
  };

  const handlePrevClick = () => {
    if (positionCounter < frameSize * itemWidth && positionCounter > 0) {
      positionCounter -= lastImages * itemWidth;
    }

    if (positionCounter !== 0) {
      positionCounter -= step * itemWidth;
    }

    wrapperRef.current!.style.transform = `translateX(-${positionCounter}px)`;
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <div
        className="Carousel__wrapper"
        ref={wrapperRef}
        data-duration={animationDuration}
        style={{ transition: `transform ${animationDuration}ms` }}
      >
        {images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt={`${i + 1}`}
            className="Carousel__img"
            width={itemWidth}
            height={itemWidth}
          />
        ))}
      </div>

      <div className="Carousel__buttons-wrapper">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrevClick}
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Carousel;
