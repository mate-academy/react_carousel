import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images?: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

type Props = CarouselProps;

const defaultImages: string[] = [
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/7.png',
  './img/8.png',
  './img/9.png',
  './img/10.png',
];

const Carousel: React.FC<Props> = ({
  images = defaultImages,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const maxIndex = images.length - frameSize;
  const [prev, setPrev] = useState<number>(0);

  const handleNext = () => {
    setPrev(current => {
      const next = current + step;

      if (infinite) {
        return next > maxIndex ? 0 : next;
      }

      return Math.min(next, maxIndex);
    });
  };

  const handlePrev = () => {
    setPrev(current => {
      const next = current - step;

      if (infinite) {
        return next < 0 ? maxIndex : next;
      }

      return Math.max(next, 0);
    });
  };

  return (
    <div className="Carousel">
      <button
        className="Carousel__button"
        type="button"
        onClick={handlePrev}
        disabled={!infinite && prev === 0}
      >
        ⟵
      </button>

      <div className="Carousel__frame" style={{ width: itemWidth * frameSize }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${prev * itemWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image: string, index: number) => (
            <li className="Carousel__item" key={image}>
              <img src={image} alt={`Slide ${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        className="Carousel__button"
        type="button"
        onClick={handleNext}
        disabled={!infinite && prev >= maxIndex}
      >
        ⟶
      </button>
    </div>
  );
};

export default Carousel;
