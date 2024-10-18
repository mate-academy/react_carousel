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

  const handlePrev = () => {
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
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{
          width: `${frameSize * itemWidth}px`,
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map(image => (
          <li key={image}>
            <img
              style={{
                width: `${itemWidth}px`,
              }}
              src={image}
              alt={`${image.slice(6, 7)}`}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          disabled={!infinite && currentIndex === 0}
          onClick={handlePrev}
        >
          Prev
        </button>

        <button
          data-cy="next"
          className="Carousel__button"
          type="button"
          disabled={!infinite && currentIndex >= images.length - frameSize}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
