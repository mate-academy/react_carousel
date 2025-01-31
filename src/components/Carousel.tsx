import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  animationDuration: number;
  infinite?: boolean;
  step: number;
  frameSize: number;
};

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  animationDuration,
  step,
  frameSize,
}) => {
  const [position, setPosition] = useState(0);

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * frameSize}px`,
          overflow: 'hidden',
        }}
      >
        {images.map((image: string, index: number) => (
          <li key={index}>
            <img
              width={itemWidth}
              className="Carousel__img"
              style={{
                transform: `translateX(${position}px)`,
                transition: `transform ${animationDuration}ms ease-in-out`,
              }}
              src={image}
              alt={`${index}`}
              data-cy={`carousel-image-${index}`}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setPosition(position + itemWidth * step)}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={() => setPosition(position - itemWidth * step)}
      >
        Next
      </button>
    </div>
  );
};
