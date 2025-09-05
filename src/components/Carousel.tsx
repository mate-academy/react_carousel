import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
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
    let changeImages: string | number | NodeJS.Timeout | undefined = undefined;

    if (infinite) {
      changeImages = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev + step >= images.length - frameSize) {
            return 0;
          }

          return prev + step;
        });
      }, animationDuration);

      return () => clearInterval(changeImages);
    } else {
      if (currentIndex < images.length - frameSize) {
        changeImages = setInterval(() => {
          setCurrentIndex(prev =>
            Math.min(prev + step, images.length - frameSize),
          );
        }, animationDuration);
      }

      return () => clearInterval(changeImages);
    }
  }, [
    currentIndex,
    step,
    images.length,
    frameSize,
    animationDuration,
    infinite,
  ]);

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <div className="Carousel__container">
        <ul
          className="Carousel__list"
          style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
        >
          {images.map((image, index) => (
            <li key={index}>
              <img
                src={image}
                alt={(index + 1).toString()}
                style={{ height: itemWidth }}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          type="button"
          data-cy="prev"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(Math.max(currentIndex - step, 0))}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          disabled={currentIndex + frameSize >= images.length}
          onClick={() =>
            setCurrentIndex(
              Math.min(currentIndex + step, images.length - frameSize),
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
