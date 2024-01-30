import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  animDur: number;
  frameSize: number;
  itemWidth: number;
  infinite: boolean
  currentImage: number;
  setCurrentImage: (value: number) => void;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  animDur,
  frameSize,
  itemWidth,
  infinite,
  currentImage,
  setCurrentImage,
}) => {
  const imagesLeft = images.length - frameSize;

  function goPrev() {
    return (
      currentImage !== 0
        ? setCurrentImage(currentImage - step >= 0 ? currentImage - step : 0)
        : setCurrentImage(imagesLeft)
    );
  }

  function goNext() {
    return (
      currentImage !== imagesLeft
        ? setCurrentImage(currentImage + step <= imagesLeft ? currentImage + step : imagesLeft)
        : setCurrentImage(0)
    );
  }

  const prevDisabled = (currentImage === 0) && !infinite;
  const nextDisabled = (currentImage === imagesLeft) && !infinite;

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {images.map((image, i) => (
          <li
            className='Carousel__image'
          >
            <img
              src={image}
              alt={`${i + 1}`}
              width={itemWidth}
            />
            </li>
        ))}
      </ul>
      <div className="Carousel__buttons">
        <button
          type="button"
          className={
            prevDisabled
              ? 'Carousel__btn Carousel__btn--disabled'
              : 'Carousel__btn Carousel__btn--active'
          }
          onClick={goPrev}
          disabled={prevDisabled}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          className={
            nextDisabled
              ? 'Carousel__btn Carousel__btn--disabled'
              : 'Carousel__btn Carousel__btn--active'
          }
          onClick={goNext}
          disabled={nextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Carousel;
