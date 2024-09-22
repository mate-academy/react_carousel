import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [firstVisibleImgIndex, setFirstVisibleImgIndex] = useState(0);

  const handlePrevButtonClick = () => {
    const posibleIndex = firstVisibleImgIndex - step;
    let newIndex = Math.max(0, posibleIndex);

    if (infinite && posibleIndex === -step) {
      const maxIndex = images.length - frameSize;

      newIndex = Math.min(posibleIndex + images.length, maxIndex);
    }

    setFirstVisibleImgIndex(newIndex);
  };

  const handleNextButtonClick = () => {
    const posibleIndex = firstVisibleImgIndex + step;
    const maxIndex = images.length - frameSize;
    let newIndex = Math.min(maxIndex, posibleIndex);

    if (infinite && posibleIndex > maxIndex) {
      newIndex = Math.min(
        maxIndex,
        (posibleIndex + images.length) % images.length,
      );
    }

    setFirstVisibleImgIndex(newIndex);
  };

  return (
    <div
      className="carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="carousel__list"
        style={{
          transition: `all ${animationDuration}ms ease`,
          transform: `translateX(-${firstVisibleImgIndex * itemWidth}px)`,
        }}
      >
        {images.map((img, index) => {
          return (
            <li className="carousel__item" key={`${img} index:${index}`}>
              <img
                className="carousel__img"
                src={img}
                alt={`Image ${index}`}
                width={itemWidth}
              />
            </li>
          );
        })}
      </ul>
      <div className="carousel__buttons">
        <button
          className="carousel__button button"
          type="button"
          disabled={!infinite && firstVisibleImgIndex === 0}
          onClick={handlePrevButtonClick}
        >
          Prev
        </button>
        <button
          data-cy="next"
          className="carousel__button button"
          type="button"
          disabled={
            !infinite && firstVisibleImgIndex >= images.length - frameSize
          }
          onClick={handleNextButtonClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
