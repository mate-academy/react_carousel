import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidthState: number;
  frameSizeState: number;
  stepState: number;
  animationDurationState: number;
  isInfiniteState: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidthState,
  frameSizeState,
  stepState,
  animationDurationState,
  isInfiniteState,
}) => {
  const [carouselList, setCarouselList] = useState(0);

  const previous = () => {
    if (stepState - carouselList < 0) {
      setCarouselList(carouselList - stepState);
    } else {
      if (carouselList === 0 && isInfiniteState) {
        setCarouselList(images.length - frameSizeState);
      } else {
        setCarouselList(0);
      }
    }
  };

  const next = () => {
    setCarouselList((firstIndex: number) =>
      Math.min(firstIndex + stepState, images.length - frameSizeState),
    );
  };

  return (
    <div style={{ width: itemWidthState * images.length }} className="Carousel">
      <div
        style={{ width: itemWidthState * frameSizeState }}
        className="Carousel__visible"
      >
        <ul
          style={{
            height: itemWidthState,
            right: carouselList * itemWidthState,
            transition: `all ${animationDurationState}ms`,
          }}
          className="Carousel__list"
        >
          {images.map((image, index) => (
            <img key={`${index}-${image}`} src={image} alt={String(index)} />
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          onClick={previous}
          disabled={isInfiniteState === false && carouselList === 0}
          type="button"
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          onClick={next}
          disabled={
            isInfiniteState === false &&
            carouselList >= images.length - frameSizeState
          }
          data-cy="next"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
