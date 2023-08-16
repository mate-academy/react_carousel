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

  const handleNextClick = () => {
    if (infinite && offset + step > images.length - frameSize) {
      setOffset((offset + step) % images.length);
    } else {
      setOffset(Math.min(offset + step, images.length - frameSize));
    }
  };

  const handlePrevClick = () => {
    if (infinite && offset - step < 0) {
      setOffset(images.length - ((frameSize - offset + step) % frameSize));
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
            'button--disabled': offset >= images.length - frameSize
              && !infinite,
          })}
          onClick={handleNextClick}
          disabled={offset >= images.length - frameSize && !infinite}
          data-cy="next"
        >
          &gt;
        </button>
      </div>

    </div>
  );
};

export default Carousel;
