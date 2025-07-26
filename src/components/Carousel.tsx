import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const maxIndex = images.length - frameSize;

  const handlePrev = () => {
    setCurrentImage(prev => {
      if (infinite) {
        let newIndex = prev - step;

        if (newIndex < 0) {
          newIndex = maxIndex + (newIndex + 1);
          if (newIndex < 0) {
            newIndex = 0;
          }
        }

        return newIndex;
      }

      return Math.max(prev - step, 0);
    });
  };

  const handleNext = () => {
    setCurrentImage(prev => {
      if (infinite) {
        let newIndex = prev + step;

        if (newIndex > maxIndex) {
          newIndex = newIndex - maxIndex - 1;
          if (newIndex > maxIndex) {
            newIndex = maxIndex;
          }
        }

        return newIndex;
      }

      return Math.min(prev + step, maxIndex);
    });
  };

  const trackStyle = {
    transform: `translateX(-${currentImage * itemWidth}px)`,
    transition: `transform ${animationDuration}ms ease-in-out`,
    width: `${images.length * itemWidth}px`,
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * itemWidth}px`, overflow: 'hidden' }}
    >
      <ul className="Carousel__list" style={trackStyle}>
        {images.map((image, index) => {
          return (
            <li className="Carousel__item" key={image}>
              <img
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
                data-cy="carousel-img"
              />
            </li>
          );
        })}
      </ul>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
