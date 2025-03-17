import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [visibleElements, setVisibleElements] = useState(0);

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={{ width: itemWidth * frameSize }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${visibleElements}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map(image => {
            const unicNum = image.split('/')[2].split('.')[0];

            return (
              <li key={unicNum}>
                <img src={image} alt={unicNum} width={itemWidth} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="Carousel-button__container">
        <button
          className="Carousel-button"
          type="button"
          onClick={() => {
            if (visibleElements !== 0) {
              setVisibleElements(
                Math.max(visibleElements - itemWidth * step, 0),
              );
            }
          }}
        >
          Prev
        </button>

        <button
          className="Carousel-button"
          data-cy="next"
          type="button"
          onClick={() => {
            if (
              visibleElements !==
              itemWidth * images.length - itemWidth * step
            ) {
              setVisibleElements(
                Math.min(
                  visibleElements + itemWidth * step,
                  itemWidth * images.length - itemWidth * frameSize,
                ),
              );
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
