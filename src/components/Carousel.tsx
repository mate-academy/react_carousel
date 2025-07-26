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
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [valueX, setValueX] = useState(0);
  const maxOffset = images.length - frameSize;

  return (
    <div
      className="Carousel"
      style={
        {
          '--x': `${valueX}px`,
          '--size-image': `${itemWidth}px`,
          '--frame-size': frameSize,
          '--animation-duration': `${animationDuration}ms`,
        } as React.CSSProperties
      }
    >
      <ul className="Carousel__list">
        {images.map((img, index) => (
          <li key={index}>
            <img src={img} alt={`${index + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() =>
          setValueX(prev => {
            {
              const prevIndex = Math.abs(prev / itemWidth) - step;

              if (prevIndex < 0) {
                return infinite ? -itemWidth * maxOffset : 0;
              }

              return prev + itemWidth * step;
            }
          })
        }
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={() =>
          setValueX(prev => {
            const nextIndex = Math.abs(prev / itemWidth) + step;

            if (nextIndex + frameSize > images.length) {
              return infinite ? 0 : -itemWidth * maxOffset;
            }

            return prev - itemWidth * step;
          })
        }
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
