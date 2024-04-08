import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < images.length - step) {
      setCurrentIndex(currentIndex + step);
    } else if (infinite) {
      setCurrentIndex((currentIndex + step) % images.length);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - step);
    } else if (infinite) {
      setCurrentIndex(images.length - step);
    }
  };

  useEffect(() => {
    const maxIndex = images.length - frameSize;

    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [frameSize, images.length, currentIndex]);

  return (
    <div className="Carousel">
      <button
        type="button"
        className="Carousel__Btn"
        onClick={handlePrevious}
        disabled={!infinite && currentIndex === 0}
      >
        Prev
      </button>
      <div
        className="Carousel__Container"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth}px`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                transition: `transform ${animationDuration}ms ease`,
                transform: `translateX(-${currentIndex * itemWidth}px`,
              }}
            >
              <img
                src={image}
                alt={`Image ${index}`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        data-cy="next"
        type="button"
        className="Carousel__Btn"
        onClick={handleNext}
        disabled={!infinite && currentIndex >= images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
