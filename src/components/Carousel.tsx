import React, { useState } from 'react';
import './Carousel.scss';

interface CaoruselProps {
  images: string[];
  gap: number;
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CaoruselProps> = ({
  images,
  gap,
  step,
  itemWidth,
  frameSize,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemWidthWithGap = itemWidth + gap;
  const transformValue = -currentIndex * itemWidthWithGap;
  const maxStartIndex = Math.max(0, images.length - frameSize);

  return (
    <>
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{ width: `${frameSize * itemWidthWithGap}px` }}
        >
          <ul
            style={{
              width: `${images.length * itemWidthWithGap}`,
              gap: `${gap}px`,
              transform: `translateX(${transformValue}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
            className="Carousel__list"
          >
            {images.map((i, index) => (
              <li key={index} className="list__item">
                <img
                  className="list__img"
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                  src={i}
                  alt={`${index}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons">
          <button
            onClick={() => {
              if (infinite && currentIndex === 0) {
                setCurrentIndex(maxStartIndex);

                return;
              }

              setCurrentIndex(c => Math.max(0, c - step));
            }}
            disabled={!infinite && currentIndex === 0}
            className="button"
            type="button"
          >
            &#x25C0;
          </button>
          <button
            data-cy="next"
            onClick={() => {
              if (infinite && currentIndex === maxStartIndex) {
                setCurrentIndex(0);

                return;
              }

              setCurrentIndex(c => Math.min(maxStartIndex, c + step));
            }}
            disabled={!infinite && currentIndex === maxStartIndex}
            className="button"
            type="button"
          >
            &#x25B6;
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
