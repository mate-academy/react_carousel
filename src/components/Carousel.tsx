import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};
export const Carousel: React.FC<Props> = (props) => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = props;

  const [move, setMove] = useState(0);
  const [itemLength, setItemWidth] = useState(itemWidth);
  const carouselWidth = images.length * itemLength;

  useEffect(() => {
    if (itemWidth !== itemLength) {
      if (move !== 0) {
        setMove(prevState => prevState - frameSize);
      }

      setItemWidth(itemWidth);
    }
  });
  const handlerNext = () => {
    if (move < -carouselWidth + step * itemLength) {
      if (infinite) {
        setMove(0);
      }
    } else {
      setMove(prevPosition => prevPosition - step * itemLength);
    }
  };

  const handlerPrev = () => {
    if (move < 0) {
      setMove(prevPosition => prevPosition + step * itemLength);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemLength}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${move}px)`,
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li
            key={Math.random()}
            style={{ width: `${itemLength}px` }}
          >
            <figure
              style={{ width: `${itemLength}px` }}
            >
              <img
                className="Carousel__picture"
                src={image}
                alt={(index + 1).toString()}
                style={{ width: `${itemLength}px` }}
              />
            </figure>
          </li>
        ))}
      </ul>
      <button
        className="Carousel__button button is-success"
        type="button"
        onClick={() => {
          handlerPrev();
        }}
      >
        Prev
      </button>
      <button
        className="Carousel__button button is-warning"
        data-cy="next"
        type="button"
        onClick={() => {
          handlerNext();
        }}
      >
        Next
      </button>
    </div>
  );
};
