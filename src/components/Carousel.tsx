import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    if (infinite && currentIndex >= images.length - frameSize) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(Math.min(currentIndex + step, images.length - frameSize));
    }
  };

  const handlePrev = () => {
    if (infinite && currentIndex === 0) {
      setCurrentIndex(images.length - frameSize);
    } else {
      setCurrentIndex(Math.max(currentIndex - step, 0));
    }
  };

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${-currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((img, index) => (
          <li key={img}>
            <img src={img} alt={String(index + 1)} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button onClick={handlePrev} type="button" data-cy="prev">
        Prev
      </button>

      <button onClick={handleNext} type="button" data-cy="next">
        Next
      </button>
    </div>
  );
};

export default Carousel;
