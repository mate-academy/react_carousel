import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const GAP = 20;
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxWidth = frameSize * itemWidth + (frameSize - 1) * GAP;
  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + step, images.length - frameSize));
  };

  const handlePrevious = () => {
    setCurrentIndex(Math.max(currentIndex - step, 0));
  };

  const styles = {
    gap: `${GAP}px`,
    maxWidth: `${maxWidth}px`,
    transform: `translateX(-${currentIndex * (itemWidth + GAP)}px)`,
    transition: `transform ${animationDuration}ms ease-out`,
  };

  useEffect(() => {
    const maxIndex = images.length - frameSize;

    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [frameSize, images.length, currentIndex]);

  return (
    <div className="carousel">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        Prev
      </button>
      <div className="carousel__container">
        <ul className="carousel__list" style={styles}>
          {images.map((image: string, index: number) => (
            <li key={index}>
              <img
                src={image}
                alt={`${index}`}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentIndex >= images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
