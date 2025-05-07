import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex - step + images.length) % images.length;
      }

      return Math.max(0, prevIndex - step);
    });
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex => {
      if (infinite) {
        return (prevIndex + step) % images.length;
      }

      return Math.min(images.length - frameSize, prevIndex + step);
    });
  };

  return (
    <div className="Carousel">
      <button
        className={`Carousel__arrow Carousel__arrow--left ${currentIndex <= 0 && !infinite ? 'disabled' : ''}`}
        onClick={handlePrevClick}
        disabled={currentIndex <= 0 && !infinite}
      >
        &#8592;
      </button>

      <div
        className="Carousel__wrapper"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * (itemWidth + 10)}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={index} className="Carousel__item">
              <img
                className="Carousel__image"
                src={image}
                alt={`Image ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`Carousel__arrow Carousel__arrow--right ${currentIndex >= images.length - frameSize && !infinite ? 'disabled' : ''}`}
        onClick={handleNextClick}
        disabled={currentIndex >= images.length - frameSize && !infinite}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
