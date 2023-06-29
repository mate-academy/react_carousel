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
  const wrapperRef = useRef<HTMLUListElement>(null);
  let positionCounter = 0;
  const lastImages = images.length % frameSize;
  const maxPosCounter = (images.length * itemWidth) - (frameSize * itemWidth);
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
    if (positionCounter < frameSize * itemWidth && positionCounter !== 0) {
      positionCounter -= lastImages * itemWidth;
    } else if (positionCounter > 0) {
      positionCounter -= step * itemWidth;
    }

    wrapperRef.current!.style.transform = `translateX(-${positionCounter}px)`;
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__wrapper"
        ref={wrapperRef}
        data-duration={animationDuration}
        style={{
          transition: `transform ${animationDuration}ms`,
          width: images.length * itemWidth,
        }}
      >
        {images.map((img, i) => (
          <li key={img} className="Carousel__item">
            <img
              src={img}
              alt={`${i + 1}`}
              className="Carousel__img"
              width={itemWidth}
              height={itemWidth}
            />
          </li>

        ))}
      </ul>

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
