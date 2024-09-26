import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
}) => {
  const [offset, setOffset] = useState(1);

  const maxOffset = -1 * (images.length - frameSize) * itemWidth;

  const isPrevDisabled = offset === 1;
  const isNextDisabled = Math.abs(offset) >= Math.abs(maxOffset);

  const handleNext = () => {
    setOffset(Math.max(maxOffset, offset - itemWidth * step));
  };

  const handlePrev = () => {
    if (offset !== 0) {
      setOffset(Math.min(1, offset + itemWidth * step));
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${offset}px)`,
            transition: `transform ${animationDuration}ms ease-out`,
          }}
        >
          {images.map((image, idx) => (
            <li key={image} style={{ width: `${itemWidth}px` }}>
              <img src={image} alt={String(idx)} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="btns">
        <button disabled={isPrevDisabled} onClick={handlePrev} type="button">
          Prev
        </button>
        <button
          data-cy="next"
          disabled={isNextDisabled}
          onClick={handleNext}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
