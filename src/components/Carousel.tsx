import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinity: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinity,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImages = images.slice(currentIndex, currentIndex + frameSize);

  useEffect(() => {
    let changeImages: string | number | NodeJS.Timeout | undefined = undefined;

    if (infinity) {
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
    infinity,
  ]);

  return (
    <div className="Carousel" style={{ width: itemWidth * frameSize }}>
      <ul className="Carousel__list">
        {visibleImages.map((image, index) => (
          <li key={index}>
            <img
              src={image}
              alt={(index + 1).toString()}
              style={{ width: itemWidth, height: itemWidth }}
            />
          </li>
        ))}
      </ul>
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
