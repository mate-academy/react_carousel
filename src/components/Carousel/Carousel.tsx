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

  const extendedImages = infinite
    ? [...images.slice(-frameSize), ...images, ...images.slice(0, frameSize)]
    : images;

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + step;

      if (newIndex >= extendedImages.length - frameSize) {
        return infinite ? frameSize : extendedImages.length - frameSize;
      }

      return newIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex - step;

      if (newIndex < 0) {
        return infinite ? extendedImages.length - frameSize * 2 : 0;
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
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
          width: `${images.length * itemWidth}px`,
        }}
      >
        {extendedImages.map((image, index) => (
          <li
            key={index}
            style={{
              flex: `0 0 ${itemWidth}px`,
            }}
          >
            <img
              data-cy={`carousel-image-${index}`}
              src={image}
              alt={`Image ${index}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
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
