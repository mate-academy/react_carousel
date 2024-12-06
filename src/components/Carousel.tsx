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
  const [position, setPosition] = useState(0);
  const [scrollText, setScrollText] = useState(`Step 1`);

  const handleNext = () => {
    setPosition(prev => {
      const newPosition = prev + step;

      setScrollText(
        `Step ${Math.min(newPosition, images.length - frameSize) + 1}`,
      );
      if (infinite && prev + step >= images.length - frameSize) {
        setScrollText(`Step 1`);

        return 0;
      }

      return Math.min(prev + step, images.length - frameSize);
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      const newPosition = prev - step;

      setScrollText(`Step ${Math.max(newPosition, 0) + 1}`);
      if (infinite && prev - step < 0) {
        setScrollText(`Step ${images.length - frameSize}`);

        return images.length - frameSize;
      }

      return Math.max(prev - step, 0);
    });
  };

  return (
    <div
      className="Carousel"
      style={
        {
          '--item-width': `${itemWidth}px`,
          '--frame-size': frameSize.toString(),
        } as React.CSSProperties
      }
    >
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * images.length}px`,
          transition: `transform ${animationDuration}ms`,
          transform: `translateX(-${position * itemWidth}px)`,
        }}
      >
        {images.map((image, index) => (
          <li key={index}>
            <img src={image} width={itemWidth} alt={`Slide ${index + 1}`} />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <button type="button" onClick={handleNext} data-cy="next">
        Next
      </button>

      <div className="Carousel__text" data-cy="stepText">
        {scrollText}
      </div>
    </div>
  );
};

export default Carousel;
