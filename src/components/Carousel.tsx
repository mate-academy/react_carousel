import React, { useState } from 'react';
import './Carousel.scss';
import { Props } from './Types';

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [scroll, setScroll] = useState(0);
  const maxScroll = (images.length - frameSize) * itemWidth;
  const stepScroll = step * itemWidth;

  const scrollForward = () => {
    setScroll((prev: number): number => {
      let newScroll = prev + stepScroll;
      const lastElem = maxScroll === prev;

      if (newScroll >= maxScroll && !lastElem) {
        newScroll = maxScroll;
      }

      if (infinite) {
        return newScroll > maxScroll && lastElem ? 0 : newScroll;
      } else {
        return Math.min(maxScroll, newScroll);
      }
    });
  };

  const scrollBack = () => {
    setScroll((prev: number): number => {
      let newScroll = prev - stepScroll;

      if (newScroll < 0) {
        newScroll = 0;
      }

      if (infinite) {
        return prev === 0 ? maxScroll : newScroll;
      } else {
        return Math.max(0, prev - stepScroll);
      }
    });
  };

  return (
    <>
      <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-scroll}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, index) => {
            return (
              <li key={index} className="Carousel__image">
                <img
                  src={img}
                  alt={`Image No ${index + 1}`}
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => scrollBack()}
          disabled={!infinite && scroll === 0}
        >
          &lt;
        </button>
        <button
          type="button"
          disabled={scroll >= maxScroll && !infinite}
          onClick={() => scrollForward()}
          data-cy="next"
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default Carousel;
