import React, { useRef, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  duration: number,
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  duration,
}) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [currentPosition, setCurrentPossition] = useState(0);

  function showPrev() {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= (itemWidth * step);
      setCurrentPossition(currentPosition - itemWidth * step);
    }
  }

  function showNext() {
    if (containerRef.current) {
      containerRef.current.scrollLeft += (itemWidth * step);
      setCurrentPossition(currentPosition + itemWidth * step);
    }
  }

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={showPrev}
        className="Carousel__button"
        disabled={currentPosition === 0}
      >
        Prev
      </button>

      <div
        className="Carousel__container"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentPosition}px)`,
            transition: `transform ${duration}ms ease-in-out`,
          }}
          ref={containerRef}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`${index + 1}`}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        type="button"
        onClick={showNext}
        className="Carousel__button"
        disabled={currentPosition >= itemWidth * (images.length - frameSize)}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
