import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration?: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = images.length;

  const handlePrevButton = () => {
    let newIndex = currentIndex - step;

    if (infinite) {
      if (newIndex < 0) {
        newIndex = (totalImages + newIndex) % totalImages;
      }
    } else {
      newIndex = Math.max(0, newIndex);
    }

    setCurrentIndex(newIndex);
  };

  const handleNextButton = () => {
    let newIndex = currentIndex + step;

    if (infinite) {
      if (newIndex >= totalImages) {
        newIndex = newIndex % totalImages;
      }
    } else {
      newIndex = Math.min(totalImages - frameSize, newIndex);
    }

    setCurrentIndex(newIndex);
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__container"
        style={{
          width: `${frameSize * itemWidth}px`,
          overflow: 'hidden',
          display: 'flex',
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        {images.map((src, index) => {
          const start = currentIndex % totalImages;
          const end = (start + frameSize) % totalImages;

          const isVisible =
            start <= end
              ? index >= start && index < end
              : index >= start || index < end;

          return (
            <li
              key={index}
              className={`Carousel__item ${isVisible ? 'visible' : 'hidden'}`}
              style={{
                width: `${itemWidth}px`,
                opacity: isVisible ? 1 : 0,
                position: isVisible ? 'static' : 'absolute',
                transition: `transform ${animationDuration}ms ease-in-out`,
              }}
            >
              <img
                src={src}
                alt={`img-${index}`}
                width={itemWidth}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          );
        })}
      </ul>
      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrevButton}
          disabled={!infinite && currentIndex === 0}
        >
          &larr; Prev
        </button>
        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={handleNextButton}
          disabled={!infinite && currentIndex + frameSize >= totalImages}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
