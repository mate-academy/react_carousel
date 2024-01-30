import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite:boolean;
};
const Carousel: React.FC <CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImage, setCurrentImage] = useState(0); // setting images by index

  const carouselWidth = frameSize * itemWidth;
  const maxImages = images.length - frameSize;
  const disableAction = !infinite && currentImage === 0;
  const disableActionNext = !infinite && currentImage === maxImages;

  const prevItems = () => (
    currentImage === 0
      ? setCurrentImage(maxImages)
      : setCurrentImage(prev => Math.max((prev - step), 0))
  );

  const nextItems = () => (
    currentImage !== maxImages
      ? setCurrentImage(prev => Math.min(prev + step, maxImages))
      : setCurrentImage(0)
  );

  return (
    <div
      className="Carousel"
      style={{
        width: `${carouselWidth}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          width: `${carouselWidth}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        {images.map((img, index) => (
          <li
            key={img}
            style={{
              width: `${itemWidth}px`,
              height: `${itemWidth}px`,
              transform: `translateX(${-currentImage * 100}%)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={img}
              alt={(index + 1).toString()}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
                transition: `${animationDuration}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel_button">
        <button
          type="button"
          className="Carousel_prev"
          onClick={prevItems}
          disabled={disableAction}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          className="Carousel_next"
          onClick={nextItems}
          disabled={disableActionNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
