import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, images.length - frameSize);

  const buttonNext = () => {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex + step) % images.length;
      }

      return Math.min(prevIndex + step, maxIndex);
    });
  };

  const buttonPrev = () => {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex - step + images.length) % images.length;
      }

      return Math.max(prevIndex - step, 0);
    });
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <div className="Carousel__wrapper" style={{ overflow: 'hidden' }}>
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms ease`,
            transform: `translateX(-${currentIndex * itemWidth}px)`,
          }}
        >
          {images.map((src, index) => (
            <li key={index} className={index === currentIndex ? 'active' : ''}>
              <img width={itemWidth} src={src} alt={`Image ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
      <div className="conteiner__button">
        <button
          type="button"
          className="buttonPrev"
          onClick={buttonPrev}
          disabled={!infinite && currentIndex === 0}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          className="buttonNext"
          onClick={buttonNext}
          disabled={!infinite && currentIndex >= maxIndex}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
