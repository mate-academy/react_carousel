import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);
  const maxFirstVisibleIndex = Math.max(images.length - frameSize, 0);
  const safeFirstVisibleIndex = Math.min(
    firstVisibleIndex,
    maxFirstVisibleIndex,
  );
  const offset = safeFirstVisibleIndex * itemWidth;
  const isPrevDisabled = !infinite && safeFirstVisibleIndex === 0;
  const isNextDisabled =
    !infinite && safeFirstVisibleIndex === maxFirstVisibleIndex;

  return (
    <div className="Carousel">
      <div className="Carousel__frame" style={{ width: itemWidth * frameSize }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li key={image}>
              <img src={image} alt={image} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          className={isPrevDisabled ? 'disabled' : ''}
          onClick={() => {
            setFirstVisibleIndex(
              infinite && safeFirstVisibleIndex === 0
                ? maxFirstVisibleIndex
                : Math.max(safeFirstVisibleIndex - step, 0),
            );
          }}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          className={isNextDisabled ? 'disabled' : ''}
          onClick={() => {
            setFirstVisibleIndex(
              infinite && safeFirstVisibleIndex === maxFirstVisibleIndex
                ? 0
                : Math.min(safeFirstVisibleIndex + step, maxFirstVisibleIndex),
            );
          }}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
