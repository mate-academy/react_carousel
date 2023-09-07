import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImage, setCurrentImage] = useState(1);
  const imageRigth = (currentImage - 1) * itemWidth;
  const imageLeft = images.length - frameSize + 1;

  const widthCarousel = frameSize * itemWidth;
  const isEnd = currentImage === imageLeft;
  const isStart = currentImage === 1;

  const handleNextImage = () => {
    if (!isEnd) {
      const nextImage = currentImage + step;

      setCurrentImage(nextImage > imageLeft
        ? imageLeft
        : nextImage);
    } else if (infinite) {
      setCurrentImage(1);
    }
  };

  const handlePrevImage = () => {
    if (!isStart) {
      const nextImage = currentImage - step;

      setCurrentImage(nextImage < 1
        ? 1
        : nextImage);
    } else if (infinite) {
      setCurrentImage(imageLeft);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${widthCarousel}px` }}
      >
        {images.map(image => (
          <li
            key={image}
            style={{
              transform: `translateX(-${imageRigth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={image}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className={cn('Carousel__button', {
            'Carousel__button--disabled': isStart && !infinite,
          })}
          type="button"
          onClick={handlePrevImage}
        >
          Prev
        </button>
        <button
          className={cn('Carousel__button', {
            'Carousel__button--disabled': isEnd && !infinite,
          })}
          type="button"
          data-cy="next"
          onClick={handleNextImage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
