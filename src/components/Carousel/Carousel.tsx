import { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

export const Carousel = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}: Props) => {
  const [firstVisibleImage, setFirstVisibleImage] = useState(0);

  const maxFirstVisibleImage = Math.max(images.length - frameSize, 0);

  useEffect(() => {
    setFirstVisibleImage(currentImage =>
      Math.min(currentImage, maxFirstVisibleImage),
    );
  }, [maxFirstVisibleImage]);

  const handleNext = () => {
    setFirstVisibleImage(currentImage => {
      const nextImage = currentImage + step;

      if (nextImage <= maxFirstVisibleImage) {
        return nextImage;
      }

      if (infinite) {
        return 0;
      }

      return maxFirstVisibleImage;
    });
  };

  const handlePrevious = () => {
    setFirstVisibleImage(currentImage => {
      const previousImage = currentImage - step;

      if (previousImage >= 0) {
        return previousImage;
      }

      if (infinite) {
        return maxFirstVisibleImage;
      }

      return 0;
    });
  };

  const isPreviousDisabled = !infinite && firstVisibleImage === 0;

  const isNextDisabled =
    !infinite && firstVisibleImage === maxFirstVisibleImage;

  return (
    <div className="carousel">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
      >
        Previous
      </button>

      <div
        className="carousel__frame"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="carousel__list"
          style={{
            transform: `translateX(-${firstVisibleImage * itemWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li
              className="carousel__item"
              style={{
                width: `${itemWidth}px`,
              }}
              key={image}
            >
              <img
                src={image}
                alt={`Carousel item ${index + 1}`}
                className="carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={isNextDisabled}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};
