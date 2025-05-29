import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  animDuration: number;
  step: number;
  frameSize: number;
  isInfinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  animDuration,
  step,
  frameSize,
  isInfinite,
}: Props) => {
  const [offset, setOffset] = useState(0);

  const maxOffset = Math.max(0, (images.length - frameSize) * itemWidth);

  const handlePrev = () => {
    setOffset(prev => {
      const next = prev - step * itemWidth;

      if (next < 0) {
        return isInfinite ? maxOffset : 0;
      }

      return next;
    });
  };

  const handleNext = () => {
    setOffset(prev => {
      const next = prev + step * itemWidth;

      if (next > maxOffset) {
        return isInfinite ? 0 : maxOffset;
      }

      return next;
    });
  };

  return (
    <div className="Carousel">
      <button className="button is-dark is-small" onClick={handlePrev}>
        Prev
      </button>
      <div className="viewport" style={{ width: `${itemWidth * frameSize}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: `transform ${animDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={image} className="Carousel__list__item">
              <img src={image} alt={`${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="button is-dark is-small"
        onClick={handleNext}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
