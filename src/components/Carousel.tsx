/* eslint-disable max-len */
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

let scrollIndex: number = 0;
const gap: number = 20;

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [translateX, setTranslateX] = useState(`translateX(${gap / 2}px)`);

  function scrollLeft(): void {
    if (infinite && scrollIndex <= 0) {
      scrollIndex = images.length - step;
    } else {
      if (scrollIndex <= 0) {
        return;
      }

      if (scrollIndex < step) {
        scrollIndex = 0;
      } else {
        scrollIndex -= step;
      }
    }

    setTranslateX(
      `translateX(calc(${-scrollIndex * gap + gap / 2}px + ${-scrollIndex * 100}%))`,
    );
  }

  function scrollRight(): void {
    if (infinite && scrollIndex >= images.length - step) {
      scrollIndex = 0;
    } else {
      if (scrollIndex >= images.length - step) {
        return;
      }

      if (scrollIndex + frameSize > images.length - 1 - step) {
        scrollIndex = images.length - frameSize;
      } else {
        scrollIndex += step;
      }
    }

    setTranslateX(
      `translateX(calc(${-scrollIndex * gap + gap / 2}px + ${-scrollIndex * 100}%))`,
    );
  }

  return (
    <div className="Carousel">
      <div className="container-outer">
        <div
          className="container-inner"
          style={{
            width: `calc(${frameSize * gap}px + ${frameSize * itemWidth}px)`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              width: `calc(${images.length * gap}px + ${images.length * itemWidth}px)`,
              gap: `${gap}px`,
            }}
          >
            {images.map((item, index) => {
              return (
                <li
                  key={`${index}-${item}`}
                  style={{
                    transform: translateX,
                    transitionDuration: `${animationDuration}ms`,
                  }}
                >
                  <img src={item} alt={`${index + 1}`} width={itemWidth} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="arrows">
        <div className="arrows__item" onClick={() => scrollLeft()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g data-name="21.Arrow Left">
              <path
                className="arrows__item-path"
                d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z"
              />
              <path
                className="arrows__item-path"
                d="M10.293 16.707 5.586 12l4.707-4.707 1.414 1.414L8.414 12l3.293 3.293-1.414 1.414z"
              />
              <path className="arrows__item-path" d="M7 11h11v2H7z" />
            </g>
          </svg>
        </div>
        <div
          className="arrows__item"
          data-cy="next"
          onClick={() => scrollRight()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g data-name="20.Arrow Right">
              <path
                className="arrows__item-path"
                d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z"
              />
              <path
                className="arrows__item-path"
                d="m13.707 16.707-1.414-1.414L15.586 12l-3.293-3.293 1.414-1.414L18.414 12l-4.707 4.707z"
              />
              <path className="arrows__item-path" d="M6 11h11v2H6z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
