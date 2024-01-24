import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number;
  infinite: boolean;
};

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [startImage, setStartImage] = useState(0);

  const carouselWidth = (frameSize * itemWidth) + ((frameSize - 1) * 10);
  const endImgIndex = startImage + frameSize;
  const translateX = startImage === 0
    ? 0
    : startImage * (itemWidth + 10);

  const handleNextChange = () => {
    if (infinite && endImgIndex === images.length) {
      setStartImage(0);
    } else {
      setStartImage(
        endImgIndex + step < images.length
          ? startImage + step
          : images.length - frameSize,
      );
    }
  };

  const handlePrevChange = () => {
    if (infinite && startImage === 0) {
      setStartImage(images.length - frameSize);
    } else {
      setStartImage(
        startImage > step
          ? startImage - step
          : 0,
      );
    }
  };

  return (
    <div
      className="Carousel"
    >
      <div
        className="Carousel__container"
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms`,
            transform: `translateX(${-(translateX)}px)`,
            width: carouselWidth,
          }}
        >
          {images.map((imgUrl) => (
            <li className="Carousel__list__item" key={imgUrl}>
              <img
                className="Carousel__list__item__img"
                src={imgUrl}
                alt="smile"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={handlePrevChange}
          disabled={!infinite && startImage === 0}
        >
          {'<<'}
        </button>

        <button
          data-cy="next"
          type="button"
          onClick={handleNextChange}
          disabled={!infinite && images.length - frameSize === startImage}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};
