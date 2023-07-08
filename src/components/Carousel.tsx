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
  const [firstImage, setFirstImage] = useState(0);

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        {images.map(image => {
          const matchResult = image.match(/(\d+)/) as RegExpMatchArray;
          const number = parseInt(matchResult[0], 10);

          return (
            <li
              key={number}
              style={{
                transform: `translateX(${-(itemWidth * firstImage)}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
            >
              <img
                src={image}
                alt={number.toString()}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          );
        })}
      </ul>
      <div>
        <button
          type="button"
          className="Carousel__button"
          disabled={firstImage === 0 && !infinite}
          onClick={() => {
            if (infinite && firstImage === 0) {
              return setFirstImage(images.length - frameSize);
            }

            return setFirstImage((value) => (
              value - step >= 0 ? (value - step) : 0
            ));
          }}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button"
          data-cy="next"
          disabled={firstImage === images.length - frameSize && !infinite}
          onClick={() => {
            if (infinite && firstImage === images.length - frameSize) {
              return setFirstImage(0);
            }

            return setFirstImage((value) => (
              (value + step) <= (images.length - frameSize)
                ? value + step
                : images.length - frameSize
            ));
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
