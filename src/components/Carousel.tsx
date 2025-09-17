import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const spacing = 10;
  const maxIndex = Math.max(images.length - frameSize, 0);

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={
          {
            '--frame-width': `${frameSize * (itemWidth + spacing) - spacing}px`,
          } as React.CSSProperties
        }
      >
        <ul
          className="Carousel__list"
          style={
            {
              '--list-width': `${images.length * (itemWidth + spacing) - spacing}px`,
              transform: `translateX(-${currentIndex * (itemWidth + spacing)}px)`,
              transition: `transform ${animationDuration}ms`,
            } as React.CSSProperties
          }
        >
          {images.map((image, index) => (
            <li
              key={index}
              style={{
                width: `${itemWidth}px`,
                marginRight: index === images.length - 1 ? 0 : `${spacing}px`,
              }}
            >
              <img src={image} alt={`Image ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="previous"
        disabled={currentIndex === 0 && infinite === false}
        onClick={() => {
          if (!infinite && currentIndex > 0) {
            setCurrentIndex(prev => Math.max(prev - step, 0));
          } else if (infinite) {
            setCurrentIndex(
              prev => (prev - step + images.length) % images.length,
            );
          }
        }}
      >
        Prev
      </button>

      <button
        type="button"
        className="next"
        disabled={
          currentIndex + frameSize >= images.length && infinite === false
        }
        data-cy="next"
        onClick={() => {
          if (!infinite && currentIndex + frameSize < images.length) {
            setCurrentIndex(prev => Math.min(prev + step, maxIndex));
          } else if (infinite) {
            setCurrentIndex(
              prev => (prev + step + images.length) % images.length,
            );
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
