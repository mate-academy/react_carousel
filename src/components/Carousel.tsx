import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  frameSize: number;
  step: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  frameSize,
  step,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextBtn = () => {
    if (currentIndex + step <= images.length - frameSize) {
      setCurrentIndex(currentIndex + step);
    } else if (infinite) {
      setCurrentIndex(0);
    }
  };

  const handlePrevBtn = () => {
    if (currentIndex - step >= 0) {
      setCurrentIndex(currentIndex - step);
    } else if (infinite) {
      setCurrentIndex(images.length - frameSize);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(img => (
            <li key={img}>
              <img src={img} alt={img} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button data-cy="prev" type="button" onClick={handlePrevBtn}>
          Prev
        </button>

        <button data-cy="next" type="button" onClick={handleNextBtn}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
