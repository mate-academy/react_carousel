import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};
const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxInd = images.length - frameSize;
  const getResultClickNext = () => {
    if (infinite) {
      setCurrentIndex((currentIndex + step) % images.length);
    } else {
      const newInd = Math.min(currentIndex + step, maxInd);

      setCurrentIndex(newInd);
    }
  };

  const getResultClickPrev = () => {
    if (infinite) {
      setCurrentIndex((currentIndex - step + images.length) % images.length);
    } else {
      const newInd = Math.max(currentIndex - step, 0);

      setCurrentIndex(newInd);
    }
  };

  const containerWidth = frameSize * itemWidth + (frameSize - 1) * 5;

  return (
    <>
      <div className="carousel-wrapper">
        <div className="container-img" style={{ width: containerWidth }}>
          <ul
            className="container-img-flex"
            style={{
              width: images.length * (itemWidth + 5) - 5,
              transform: `translateX(-${currentIndex * (itemWidth + 5)}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            {images.map((img, i) => (
              <li
                key={img}
                style={{
                  display:
                    currentIndex <= i && i < currentIndex + frameSize
                      ? 'block'
                      : 'none',
                }}
              >
                <img
                  src={img}
                  alt=""
                  className="img"
                  width={itemWidth}
                  height={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          className={`carousel-btn prev-btn ${
            !infinite && currentIndex === 0 ? 'disabled' : ''
          }`}
          onClick={getResultClickPrev}
          disabled={!infinite && currentIndex === 0}
        >
          &#8592;
        </button>
        <button
          className={`carousel-btn next-btn ${
            !infinite && currentIndex === maxInd ? 'disabled' : ''
          }`}
          onClick={getResultClickNext}
          data-cy="next"
          disabled={!infinite && currentIndex === maxInd}
        >
          &#8594;
        </button>
      </div>
    </>
  );
};

export default Carousel;
