import React, { useEffect, useState } from 'react';
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

  const imageRight = (currentImage - 1) * itemWidth;
  const imageLeft = images.length - frameSize + 1;

  const widthCarousel = frameSize * itemWidth;
  const isStart = currentImage === 1;
  const isEnd = currentImage === imageLeft;

  useEffect(() => {
    if (currentImage > images.length - frameSize + 1) {
      setCurrentImage(images.length - frameSize + 1);
    }
  }, [frameSize, images.length]);

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

  return (
    <div className="Carousel">
      <ul
        className="Carousel_list"
        style={{ width: `${widthCarousel}px` }}
      >
        {images.map(image => (
          <li
            key={image}
            className="Carousel_item"
            style={{
              transform: `translateX(-${imageRight}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              className="Carousel_image"
              src={image}
              alt={image}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel_buttons">
        <button
          className={cn('Carousel_button', {
            'Carousel_button--disabled': isStart && !infinite,
          })}
          type="button"
          onClick={handlePrevImage}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          className={cn('Carousel_button', {
            'Carousel_button--disabled': isEnd && !infinite,
          })}
          onClick={handleNextImage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
