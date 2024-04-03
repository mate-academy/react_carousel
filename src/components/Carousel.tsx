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
    if (carouselList + stepState < images.length - stepState) {
      if (
        frameSizeState > stepState &&
        carouselList + stepState > images.length - frameSizeState
      ) {
        if (
          carouselList === images.length - frameSizeState &&
          isInfiniteState
        ) {
          setCarouselList(0);
        } else {
          setCarouselList(images.length - frameSizeState);
        }
      } else {
        setCarouselList(carouselList + stepState);
      }
    } else {
      if (!(carouselList >= images.length - stepState && isInfiniteState)) {
        if (
          stepState > frameSizeState &&
          carouselList === images.length - stepState
        ) {
          setCarouselList(images.length - frameSizeState);
        } else {
          if (
            stepState > images.length / 2 &&
            carouselList > images.length / 2
          ) {
            setCarouselList(images.length - frameSizeState);
          } else {
            if (stepState > frameSizeState) {
              if (images.length - stepState < frameSizeState) {
                setCarouselList(images.length - frameSizeState);
              } else {
                setCarouselList(stepState);
              }
            } else {
              setCarouselList(images.length - stepState);
            }
          }
        }
      } else if (isInfiniteState) {
        if (
          stepState > frameSizeState &&
          carouselList < images.length - stepState
        ) {
          setCarouselList(images.length - stepState);
        } else if (
          frameSizeState > stepState &&
          carouselList < images.length - frameSizeState
        ) {
          setCarouselList(images.length - frameSizeState);
        } else {
          if (
            carouselList === images.length - frameSizeState ||
            carouselList === images.length - stepState
          ) {
            setCarouselList(0);
          } else {
            setCarouselList(images.length - frameSizeState);
          }
        }
      }
    }
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
