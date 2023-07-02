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
  const positionCounter = useRef(0);
  const lastImages = images.length % frameSize;
  const maxPosCounter = (images.length * itemWidth) - (frameSize * itemWidth);
  const border = maxPosCounter - (lastImages * itemWidth);

  const handleNextClick = () => {
    if (positionCounter.current === border) {
      positionCounter.current += lastImages * itemWidth;
    }

    if (positionCounter.current < maxPosCounter) {
      positionCounter.current += step * itemWidth;
    }

    wrapperRef.current!.style.transform = `translateX(-${positionCounter.current}px)`;
  };

  const handlePrevClick = () => {
    if (positionCounter.current < frameSize * itemWidth
      && positionCounter.current !== 0
      && lastImages !== 0) {
      positionCounter.current -= lastImages * itemWidth;
    } else if (positionCounter.current > 0) {
      positionCounter.current -= step * itemWidth;
    }

    wrapperRef.current!.style.transform = `translateX(-${positionCounter.current}px)`;
  };

  return (
    <>
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
      </div>

      <div className="Buttons">
        <button
          className="Buttons__button"
          type="button"
          onClick={handlePrevClick}
        >
          Prev
        </button>

        <button
          className="Buttons__button"
          type="button"
          data-cy="next"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
