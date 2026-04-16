import cn from 'classnames';

import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [imageIndex, setImageIndex] = React.useState(0);

  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    setImageIndex(currentIndex => {
      if (currentIndex === maxIndex) {
        return infinite ? 0 : currentIndex;
      }

      return Math.min(currentIndex + step, maxIndex);
    });
  };

  const handlePrev = () => {
    setImageIndex(currentIndex => {
      if (currentIndex === 0) {
        return infinite ? maxIndex : 0;
      }

      return Math.max(currentIndex - step, 0);
    });
  };

  return (
    <div className="Carousel">
      <button
        data-cy="prev"
        className={cn('Carousel__btn', {
          disabled: imageIndex === 0,
        })}
        type="button"
        onClick={handlePrev}
      >
        &larr;
      </button>

      <div
        className="Carousel__viewport"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${imageIndex * itemWidth}px)`,
            transition: `${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map(image => (
            <li key={image}>
              <img
                src={image}
                alt={`img-${image}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        className={cn('Carousel__btn', {
          disabled: imageIndex === maxIndex,
        })}
        type="button"
        onClick={handleNext}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Carousel;
