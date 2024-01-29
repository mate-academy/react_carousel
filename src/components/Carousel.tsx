import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [startImage, setStartImage] = useState(0);

  const endImageIndex = startImage + frameSize;
  const carouselWidth = (frameSize * itemWidth) + ((frameSize - 1) * 10);
  const translateX = startImage === 0
    ? 0
    : startImage * (itemWidth + 10);

  const handleNextChange = () => {
    if (infinite && endImageIndex === images.length) {
      setStartImage(0);
    } else {
      setStartImage(
        endImageIndex + step < images.length
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
    <div className="Carousel">
      <div className="Carousel__container">
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms`,
            transform: `translateX(${-(translateX)}px)`,
            width: carouselWidth,
          }}
        >
          {images.map((imageUrl) => (
            <li className="Carousel__lis__item" key={imageUrl}>
              <img
                className="Carousel__lis__item__img"
                src={imageUrl}
                alt="funy Face"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrevChange}
          disabled={!infinite && startImage === 0}
        >
          { '<<<' }
        </button>

        <button
          data-cy="next"
          type="button"
          className="Carousel__button"
          onClick={handleNextChange}
          disabled={!infinite && images.length - frameSize === startImage}
        >
          { '>>>' }
        </button>
      </div>
    </div>
  );
};

export default Carousel;
