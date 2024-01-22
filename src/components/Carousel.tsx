import React, { useState, useEffect } from 'react';
import './Carousel.scss';

const GAP_IMG = 10;

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
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
  const [startImage, setStartImage] = useState(0);
  const endIndexImage = startImage + frameSize;

  const widthContainer = frameSize * itemWidth + GAP_IMG * frameSize;
  const translateXValue = startImage === 0
    ? 0
    : startImage * (itemWidth + GAP_IMG);

  const handlePrevClick = () => {
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

  const handleNextClick = () => {
    if (infinite && endIndexImage === images.length) {
      setStartImage(0);
    } else {
      setStartImage(
        endIndexImage + step < images.length
          ? startImage + step
          : images.length - frameSize,
      );
    }
  };

  useEffect(() => {
    setStartImage(0);
  }, [frameSize]);

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: widthContainer }}
      >
        <ul
          className="Carousel__container__list"
          style={{
            gap: GAP_IMG,
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
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__container__block">
          <button
            className="Carousel__container__block__button"
            onClick={handlePrevClick}
            type="button"
            disabled={!infinite && startImage === 0}
          >
            Prev
          </button>
          <button
            className="Carousel__container__block__button"
            onClick={handleNextClick}
            type="button"
            data-cy="next"
            disabled={!infinite && images.length - frameSize === startImage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
