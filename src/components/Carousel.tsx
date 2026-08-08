import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentWidth, setCurrentWidth] = useState(0);

  const diff = -(images.length - frameSize) * itemWidth;
  const remaining = Math.abs(diff - currentWidth);
  const stepWidth = itemWidth * step;

  return (
    <div className="Carousel">
      <div
        className="Carousel__window"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${currentWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(img => (
            <li key={img}>
              <img
                src={`./img/${img}.png`}
                alt="4"
                width={itemWidth}
                style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="prev"
        onClick={() => {
          if (currentWidth === 0) {
            if (infinite) {
              setCurrentWidth(diff);
            } else {
              setCurrentWidth(0);
            }
          } else if (currentWidth < 0) {
            if (Math.abs(currentWidth) < stepWidth) {
              setCurrentWidth(0);
            } else {
              setCurrentWidth(currentWidth + stepWidth);
            }
          }
        }}
      >
        Prev
      </button>

      <button
        type="button"
        data-cy="next"
        onClick={() => {
          if (currentWidth === diff) {
            if (infinite) {
              setCurrentWidth(0);
            } else {
              setCurrentWidth(diff);
            }
          } else if (currentWidth > diff) {
            if (remaining < stepWidth) {
              setCurrentWidth(diff);
            } else {
              setCurrentWidth(currentWidth - stepWidth);
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
