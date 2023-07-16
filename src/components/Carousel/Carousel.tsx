import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [offset, setOffset] = useState(0);

  const containerSize = itemWidth * frameSize;
  const carouselWidth = images.length * itemWidth;
  const maxWidth = -carouselWidth + itemWidth * frameSize;

  const onPrevBtnClick = () => {
    const newOffset = offset + itemWidth * step;

    if (newOffset <= 0) {
      setOffset(newOffset);
    } else {
      setOffset(0);
    }
  };

  const onNextBtnClick = () => {
    const newOffset = offset - itemWidth * step;

    if (newOffset > maxWidth) {
      setOffset(newOffset);
    } else {
      setOffset(maxWidth);
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={{ width: `${containerSize}px` }}>
        <ul className="Carousel__list" style={{ transform: `translateX(${offset}px)`, transition: `${animationDuration}ms ease-in-out` }}>
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onPrevBtnClick}
        disabled={offset === 0}
      >
        Prev
      </button>

      <button
        type="button"
        onClick={onNextBtnClick}
        disabled={offset === maxWidth}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
