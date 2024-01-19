import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [startImage, setStartImage] = useState(0);
  const endIndexImage = startImage + frameSize;
  const translateXValue = startImage * itemWidth;

  useEffect(() => {
    setStartImage(0);
  }, [frameSize]);

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: frameSize * itemWidth }}
      >
        <ul
          className="Carousel__container__list"
          style={{
            transition: `transform ${animationDuration}ms`,
            transform: `translateX(${-(translateXValue)}px)`,
          }}
        >
          {images.map((imageUrl, index) => (
            <li
              className="Carousel__container__list__item"
              key={imageUrl}
            >
              <img
                className="Carousel__container__list__img"
                src={imageUrl}
                alt={`${index + 1}`}
                style={{ width: itemWidth, height: itemWidth }}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__container__block">
          <button
            className="Carousel__container__block__button"
            onClick={() => setStartImage(
              startImage > step
                ? startImage - step
                : 0,
            )}
            type="button"
            disabled={startImage === 0}
          >
            Prev
          </button>
          <button
            className="Carousel__container__block__button"
            onClick={() => setStartImage(
              endIndexImage + step < images.length
                ? startImage + step
                : images.length - frameSize,
            )}
            type="button"
            data-cy="next"
            disabled={images.length - frameSize === startImage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
