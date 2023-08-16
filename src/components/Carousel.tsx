import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [offset, setOffset] = useState(0);

  const maxOffset = images.length - frameSize;

  const handleNextClick = () => {
    const difference = frameSize - step;

    if (infinite && offset + step >= images.length - difference) {
      setOffset(0);
    } else {
      setOffset(Math.min(offset + step, maxOffset));
    }
  };

  const handlePrevClick = () => {
    if (infinite && offset - step < 0) {
      setOffset(maxOffset);
    } else {
      setOffset(Math.max(offset - step, 0));
    }
  };

  return (
    <div className="Carousel" style={{ width: itemWidth * frameSize }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${offset * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, index) => (
          <li key={image} style={{ width: itemWidth }}>
            <img src={image} alt={index.toString()} />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className={cn('button', {
            'button--disabled': offset === 0 && !infinite,
          })}
          onClick={handlePrevClick}
          disabled={offset === 0 && !infinite}
          data-cy="prev"
        >
          &lt;
        </button>

        <button
          type="button"
          className={cn('button', {
            'button--disabled': offset >= maxOffset && !infinite,
          })}
          onClick={handleNextClick}
          disabled={offset >= maxOffset && !infinite}
          data-cy="next"
        >
          &gt;
        </button>
      </div>

    </div>
  );
};

export default Carousel;
