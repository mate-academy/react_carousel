import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

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
        {images.map((img) => (
          <li
            key={img}
            className="Carousel__list--link"
            style={{
              transform: `translateX(-${imageRigth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={img}
              alt={img}
              style={{
                width: `${itemWidth}px`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            { 'button--disabled': (isStart && !infinite) },
          )}
          onClick={handlePrevImage}
        >
          {'<<'}
        </button>

        <button
          className={cn(
            'button',
            { 'button--disabled': (isEnd && !infinite) },
          )}
          type="button"
          onClick={handleNextImage}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
