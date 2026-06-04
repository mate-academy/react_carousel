import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration,
  infinite = false,
}) => {
  const [currentImage, setCurrentImage] = useState(1);
  const total = images.length;
  const carouselImages = infinite
    ? [images[total - 1], ...images, images[0]]
    : images;

  const translateValue = infinite
    ? `translateX(${itemWidth * (Math.floor(frameSize / 2) - currentImage)}px)`
    : `translateX(${-itemWidth * (currentImage - 1)}px)`;

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${itemWidth * frameSize}px`,
          height: `${itemWidth}px`,
        }}
      >
        <ul
          className={cn('Carousel__list', {
            'Carousel__list--edge':
              currentImage === 1 || currentImage === total,
          })}
          style={{
            transform: translateValue,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {carouselImages.map((image, i) => (
            <li key={i}>
              <img src={image} alt={(i + 1).toString()} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__button-wrapper">
        <button
          className="Carousel__button"
          type="button"
          onClick={() => {
            if (currentImage - step >= 1) {
              setCurrentImage(currentImage - step);
            } else {
              if (infinite) {
                setCurrentImage(total + currentImage - step);
              } else {
                setCurrentImage(1);
              }
            }
          }}
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={() => {
            if (currentImage + step <= total) {
              setCurrentImage(currentImage + step);
            } else {
              if (infinite) {
                setCurrentImage(step - (total - currentImage));
              } else {
                setCurrentImage(total);
              }
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
