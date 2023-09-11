import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[]
  step: number
  frameSize: number
  itemWidth: number
  animationDuration: number
  infinite: boolean
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [firstImage, setFirtstImage] = useState(0);

  const lastFirstImage = images.length - frameSize;
  const isLastImage = firstImage === lastFirstImage;
  const isFirstImage = firstImage === 0;
  const transformValue = itemWidth * firstImage;

  const handleNextClick = () => {
    if (!isLastImage && !infinite) {
      const nextFirstImage = firstImage + step;

      setFirtstImage(
        nextFirstImage > lastFirstImage
          ? lastFirstImage
          : nextFirstImage,
      );
    } else {
      setFirtstImage(lastFirstImage);
    }
  };

  const handlePrevClick = () => {
    if (!isFirstImage && !infinite) {
      const nextFirstImage = firstImage - step;

      setFirtstImage(
        nextFirstImage > 0
          ? nextFirstImage
          : 0,
      );
    } else {
      setFirtstImage(0);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${frameSize * itemWidth}px`,
            height: `${itemWidth}px`,
            transition: `transform ${animationDuration}ms`,
            transform: `translateX(${-transformValue}px)`,
          }}
        >
          {images.map((image: string) => (
            <li key={image} className="Carousel__list-item">
              <img
                src={`${image}`}
                alt={`${image[6]}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__button-container">
        <button
          type="button"
          className={isFirstImage
            ? 'Carousel__button disabled'
            : 'Carousel__button'}
          onClick={handlePrevClick}
        >
          <img
            src="./img/left-arrow.svg"
            alt="left-arrow"
            width="30px"
          />
        </button>

        <button
          type="button"
          data-cy="next"
          className={isLastImage
            ? 'Carousel__button disabled'
            : 'Carousel__button'}
          onClick={handleNextClick}
        >
          <img
            src="./img/right-arrow.svg"
            alt="right-arrow"
            width="30px"
          />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
