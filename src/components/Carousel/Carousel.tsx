import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imagesLength = images.length;
  const maxIndex = imagesLength - frameSize;

  const handleNext = () => {
    setCurrentIndex((prevIndex: number) => {
      const newIndex = prevIndex + step;

      if (infinite) {
        if (newIndex >= imagesLength) {
          return 0;
        }
      } else {
        if (newIndex > maxIndex) {
          return maxIndex;
        }
      }

      return newIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex: number) => {
      const newIndex = prevIndex - step;

      if (newIndex < 0) {
        return infinite ? imagesLength - frameSize : 0;
      }

      return newIndex;
    });
  };

  return (
    <div
      className="Carousel"
      style={{ maxWidth: `${frameSize * itemWidth}px` }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${(currentIndex * 100) / frameSize}%)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map((image, index) => (
          <li key={index}>
            <img src={image} alt={`Image ${index}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <div className="Carousel__button">
        <button onClick={handlePrevious} type="button">
          Prev
        </button>

        <button data-cy="next" onClick={handleNext} type="button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
