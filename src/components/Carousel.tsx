import React, { useEffect } from 'react';
import './Carousel.scss';
import { CarouselProps } from '../types/CarouselProps/CarouselProps';

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = React.useState(true);
  const [isNextDisabled, setIsNextDisabled] = React.useState(false);

  const corouselWidth = frameSize * itemWidth;
  const stepWidth = itemWidth * step;
  const maxPosition = images.length * itemWidth - corouselWidth;

  const handlePreviusButton = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - stepWidth);
    }
  };

  const handleNextButton = () => {
    if (currentPosition < maxPosition) {
      setCurrentPosition(currentPosition + stepWidth);
    }
  };

  useEffect(() => {
    setIsPrevDisabled(currentPosition === 0);
    setIsNextDisabled(currentPosition >= maxPosition);
  }, [currentPosition, maxPosition]);

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={{ width: `${corouselWidth}px` }}>
        {images.map((imgSrc: string, index: number) => (
          <li className="Carousel__list-element" key={index}>
            <img
              src={imgSrc}
              alt={`${index}`}
              width={`${itemWidth}`}
              height={`${itemWidth}`}
              style={{
                transform: `translateX(${-currentPosition}px)`,
                transition: `ease-in-out ${animationDuration}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handlePreviusButton}
        disabled={isPrevDisabled}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={handleNextButton}
        disabled={isNextDisabled}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
