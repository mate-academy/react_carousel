import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const gap = '30px';
  const containerWidth = `${itemWidth * images.length + (images.length - 1) * parseInt(gap, 10)}px`;
  const frameWidth = `${itemWidth * frameSize + parseInt(gap, 10) * (frameSize - 1)}px`;
  const frameHeight = `${itemWidth}px`;
  const maxOffset = parseInt(containerWidth, 10) - parseInt(frameWidth, 10);

  const [offset, setOffset] = useState(0);
  const handleNext = () => {
    setOffset(prev => {
      const newOffset = prev + (step * itemWidth + step * parseInt(gap, 10));

      return Math.min(newOffset, maxOffset);
    });
  };

  const handlePrev = () => {
    setOffset(prev => {
      const newOffset = prev - (step * itemWidth + step * parseInt(gap, 10));

      return Math.max(newOffset, 0);
    });
  };

  const isPrevDisabled = offset === 0;
  const isNextDisabled = offset >= maxOffset;

  const imageList = images.map((image, index) => {
    return (
      <li key={image} className="Carousel__image">
        <img
          src={image}
          alt={index.toString()}
          width={itemWidth}
          height={itemWidth}
          style={{
            transform: `translateX(-${offset}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        />
      </li>
    );
  });

  return (
    <div className="Carousel">
      {frameSize > 0 ? (
        <ul
          className="Carousel__list"
          style={{
            gap: gap,
            height: frameHeight,
            width: frameWidth,
            maxWidth: containerWidth,
          }}
        >
          {imageList}
        </ul>
      ) : (
        <div className="Carousel__empty">No images displayed</div>
      )}

      <div
        className="Carousel__button-wrapper"
        style={{ width: frameWidth, maxWidth: containerWidth }}
      >
        <button
          type="button"
          className="Carousel__button Carousel__button--prev"
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button Carousel__button--next"
          onClick={handleNext}
          disabled={isNextDisabled}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
