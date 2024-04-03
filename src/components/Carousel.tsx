import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidthState: number;
  setItemWidthState: (a: number) => void;
  frameSizeState: number;
  setFrameSizeState: (a: number) => void;
  stepState: number;
  setStepState: (a: number) => void;
  animationDurationState: number;
  setAnimationDurationState: (a: number) => void;
  isInfiniteState: boolean;
  setIsInfiniteState: () => void;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidthState,
  frameSizeState,
  stepState,
  animationDurationState,
  isInfiniteState,
  setAnimationDurationState,
  setFrameSizeState,
  setIsInfiniteState,
  setItemWidthState,
  setStepState,
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
        setCarouselList(images.length - frameSizeState);
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
              setCarouselList(stepState);
            } else {
              setCarouselList(images.length - stepState);
            }
          }
        }
      } else {
        setCarouselList(0);
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
            <img
              key={`${index}-${image}`}
              src={image}
              alt={String(index)}
            ></img>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          onClick={() => previous()}
          disabled={isInfiniteState === false && carouselList === 0}
          type="button"
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          onClick={() => next()}
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
      <div className="Carousel__input-box">
        <p>Item Width</p>
        <input
          className="Carousel__input"
          type="number"
          min={50}
          max={300}
          step={10}
          onChange={e => setItemWidthState(Number(e.target.value))}
          value={itemWidthState}
        />
        <p>Step</p>
        <input
          className="Carousel__input"
          type="number"
          min={0}
          max={images.length}
          step={1}
          onChange={e => {
            if (
              Number(e.target.value) > images.length ||
              Number(e.target.value) < 0
            ) {
              setStepState(1);
            } else {
              setStepState(Number(e.target.value));
            }
          }}
          value={stepState}
        />
        <p>Frame Size</p>
        <input
          className="Carousel__input"
          type="number"
          min={0}
          max={images.length}
          step={1}
          onChange={e => {
            if (
              Number(e.target.value) > images.length ||
              Number(e.target.value) < 0
            ) {
              setFrameSizeState(3);
            } else {
              setFrameSizeState(Number(e.target.value));
            }
          }}
          value={frameSizeState}
        />
        <p>Animation Duration</p>
        <input
          className="Carousel__input"
          type="number"
          min={0}
          step={100}
          onChange={e => setAnimationDurationState(Number(e.target.value))}
          value={animationDurationState}
        />
        <p>Infinite</p>
        <input
          className="Carousel__input"
          checked={isInfiniteState}
          type="checkbox"
          onChange={() => setIsInfiniteState()}
        />
      </div>
    </div>
  );
};

export default Carousel;
