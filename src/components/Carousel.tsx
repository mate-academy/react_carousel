import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  duration: number;
  step: number;
  animationDuration: number;
  onNext: (step: number) => void;
  onPrev: (step: number) => void;

};
const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  duration,
  step,
  animationDuration,
  onNext,
  onPrev,
}) => {
  const containerWidth = itemWidth * frameSize;
  const carouselWidth = itemWidth * images.length;

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${containerWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translate(${duration}px`,
            width: `${carouselWidth}px`,
            transition: `transform ${animationDuration}ms ease-out`,
          }}
        >
          {images.map(imageSrc => (
            <li key={imageSrc}>
              <img
                style={{ width: `${itemWidth}px` }}
                src={imageSrc}
                alt={imageSrc.at(-5)}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => onPrev(step)}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => onNext(step)}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
