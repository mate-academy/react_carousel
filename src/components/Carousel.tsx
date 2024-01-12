import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [indexImage, setIndexImage] = useState<number>(0);

  const handleNext = useCallback(() => {
    setIndexImage((currentImage) => {
      const newIndex = currentImage + step;
      const remainingImages = images.length - newIndex;

      if (infinite) {
        return newIndex % images.length;
      }

      if (remainingImages >= frameSize) {
        return newIndex;
      }

      return remainingImages > 0 ? currentImage + 1 : 0;
    });
  }, [infinite, setIndexImage, step, images, frameSize]);

  const handlePrev = useCallback(() => {
    setIndexImage((currentImage) => {
      const newIndex = currentImage - step;

      if (infinite) {
        return (newIndex + images.length) % images.length;
      }

      return newIndex < 0 ? images.length - frameSize : newIndex;
    });
  }, [infinite, setIndexImage, step, images, frameSize]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [handleNext, images]);

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${itemWidth * frameSize}px`,
          overflow: 'hidden',
          margin: '0 auto',
        }}
      >
        <ul
          className="Carousel__list"
        >
          {images.map((image, index) => (
            <li
              key={image}
              style={{
                transform: `translateX(-${indexImage * itemWidth}px)`,
                transition: `transform ${animationDuration}ms ease-in-out`,
              }}
            >
              <img
                src={image}
                alt={`${index}`}
                style={{
                  height: `${itemWidth}`,
                  width: `${itemWidth}`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__container-buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrev}
        >
          Prev
        </button>

        <button
          type="button"
          className="Carousel__button"
          onClick={handleNext}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
