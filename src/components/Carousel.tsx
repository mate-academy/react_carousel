import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration?: number;
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

  useEffect(() => {
    const maxIndex = Math.max(0, images.length - frameSize);

    setCurrentIndex(prev => Math.min(prev, maxIndex));
  }, [frameSize, images.length]);

  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    if (infinite) {
      setCurrentIndex(prev => (prev + step) % images.length);
    } else {
      setCurrentIndex(prev => Math.min(prev + step, maxIndex));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setCurrentIndex(prev => (prev - step + images.length) % images.length);
    } else {
      setCurrentIndex(prev => Math.max(prev - step, 0));
    }
  };

  const translateX = -(currentIndex * itemWidth);

  return (
    <div className="Carousel" style={{ width: frameSize * itemWidth }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((img, i) => (
          <li key={currentIndex + i}>
            <img src={img} alt={String(i + 1)} width={itemWidth} />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          disabled={currentIndex === 0 && !infinite}
          onClick={handlePrev}
        >
          Prev
        </button>

        <button
          data-cy="next"
          type="button"
          disabled={currentIndex >= maxIndex && !infinite}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
