import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [offset, setOffset] = useState(0);

  return (
    <div
      className="Carousel"
      style={{ width: `${itemWidth * frameSize}px`, overflow: 'hidden' }}
    >
      <ul
        className="Carousel__list"
        style={{
          width: '260px',
          padding: '0',
          display: 'flex',
          transform: `translateX(${offset}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map((img: string, index: number) => {
          return (
            <li key={index}>
              <img
                width={itemWidth}
                data-cy="image"
                style={{
                  width: itemWidth,
                }}
                src={img}
                alt={`Slide ${index}`}
              />
            </li>
          );
        })}
      </ul>

      <button
        data-cy="prev"
        type="button"
        onClick={() => {
          if (offset + step * itemWidth <= 0) {
            setOffset(offset + step * itemWidth);
          } else {
            if (infinite) {
              setOffset(offset - (images.length - frameSize) * itemWidth);
            }
          }
        }}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={() => {
          if (
            offset - step * itemWidth >=
            -(images.length - frameSize) * itemWidth
          ) {
            setOffset(offset - step * itemWidth);
          } else {
            if (infinite) {
              setOffset(0);
            }
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
