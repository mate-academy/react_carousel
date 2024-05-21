import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  infinite: boolean;
  animationDuration: number;
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  itemWidth,
  frameSize,
  animationDuration,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gap = 20;
  const maxWidth = frameSize * itemWidth + (frameSize - 1) * gap;

  const scrollNext = () => {
    setCurrentIndex(Math.min(currentIndex + step, images.length - frameSize));
  };

  const scrollPrev = () => {
    setCurrentIndex(Math.max(currentIndex - step, 0));
  };

  const listStyle = {
    gap: `${gap}px`,
    transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
    transition: `transform ${animationDuration}ms ease`,
    maxWidth: `${maxWidth}px`,
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
        className="button"
        type="button"
        onClick={scrollPrev}
        disabled={currentIndex === 0}
      >
        Prev
      </button>
      <div className="Carousel__container">
        <ul className="Carousel__container--list" style={listStyle}>
          {images.map((image: string, index: number) => (
            <li key={index}>
              <img
                className="img"
                src={image}
                alt={`Image ${index + 1}`}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        type="button"
        onClick={scrollNext}
        disabled={currentIndex >= images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
