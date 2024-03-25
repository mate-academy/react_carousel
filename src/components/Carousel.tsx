import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  step,
  frameSize,
  animationDuration,
  infinite,
}) => {
  const [imagesState, setImagesState] = useState(images);
  const [itemWidthState, setItemWidthState] = useState(itemWidth);
  const [stepState, setStepState] = useState(step);
  const [frameSizeState, setFrameSizeState] = useState(frameSize);
  const [animationDurationState, setAnimationDurationState] =
    useState(animationDuration);
  const [infiniteState, setInfiniteState] = useState(infinite);
  const [translate, setTranslate] = useState(0);

  const gap = 10;
  const minTranslate =
    -(imagesState.length - frameSizeState) * (itemWidthState + gap);

  return (
    <div className="Carousel">
      <form className="Carousel__form" action="" method="get">
        <div className="Carousel__form-item">
          <label className="Carousel__form-label" htmlFor="itemId">
            Item Width:
          </label>
          <input
            className="Carousel__form-input"
            type="number"
            name="itemWidth"
            id="itemId"
            step={50}
            min={100}
            defaultValue={itemWidth}
            onChange={event => {
              if (+event.target.value >= 100) {
                setItemWidthState(+event.target.value);
                setTranslate(0);
              }
            }}
          />
        </div>
        <div className="Carousel__form-item">
          <label className="Carousel__form-label" htmlFor="stepId">
            Step:
          </label>
          <input
            className="Carousel__form-input"
            type="number"
            name="step"
            min={1}
            defaultValue={step}
            id="stepId"
            onChange={event => {
              if (+event.target.value > 0) {
                setStepState(+event.target.value);
                setTranslate(0);
              }
            }}
          />
        </div>
        <div className="Carousel__form-item">
          <label className="Carousel__form-label" htmlFor="frameId">
            Frame Size:
          </label>
          <input
            className="Carousel__form-input"
            type="number"
            name="frameSize"
            defaultValue={frameSize}
            id="frameId"
            min={1}
            onChange={event => {
              if (+event.target.value > 0) {
                setFrameSizeState(+event.target.value);
                setTranslate(0);
              }
            }}
          />
        </div>
        <div className="Carousel__form-item">
          <label className="Carousel__form-label" htmlFor="animationDurationId">
            Animation Duration:
          </label>
          <input
            className="Carousel__form-input"
            type="number"
            name="animationDuration"
            id="animationDurationId"
            defaultValue={animationDuration}
            min={100}
            step={100}
            onChange={event => {
              if (+event.target.value >= 100) {
                setAnimationDurationState(+event.target.value);
                setTranslate(0);
              }
            }}
          />
        </div>
        <div className="Carousel__form-item">
          <label className="Carousel__form-label" htmlFor="infiniteId">
            Infinite:
          </label>
          <input
            className="Carousel__form-input"
            type="checkbox"
            name="infinite"
            id="infiniteId"
            defaultChecked={false}
            onChange={event => {
              setInfiniteState(event.target.checked);
              setTranslate(0);
              setImagesState(images);
            }}
          />
        </div>
      </form>
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidthState * frameSizeState + (frameSizeState - 1) * gap}px`,
          gap: `${gap}px`,
        }}
      >
        {imagesState.map((image, index) => (
          <li className="Carousel__item" key={index}>
            <img
              className="Carousel__img"
              src={image}
              alt={`${index + 1}`}
              width={itemWidthState}
              style={{
                transition: `transform ${animationDurationState}ms`,
                transform: `translateX(${translate}px)`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__btn Carousel__btn--prev"
          type="button"
          onClick={() =>
            setTranslate(current => {
              if (current + stepState * (itemWidthState + gap) < 0) {
                return current + stepState * (itemWidthState + gap);
              }

              return 0;
            })
          }
          style={{
            bottom: `${itemWidthState / 2 + 15}px`,
            right: `${(itemWidthState * frameSizeState + (frameSizeState - 1) * gap) / 2 + 15}px`,
          }}
        >
          <div className="Carousel__btn-el"></div>
        </button>
        <button
          className="Carousel__btn Carousel__btn--next"
          type="button"
          data-cy="next"
          onClick={() =>
            setTranslate(current => {
              if (infiniteState) {
                if (
                  current - stepState * (itemWidthState + gap) >
                  minTranslate
                ) {
                  setImagesState(currentImages => [
                    ...currentImages,
                    ...images,
                  ]);
                }

                return current - stepState * (itemWidthState + gap);
              } else {
                if (
                  current - stepState * (itemWidthState + gap) >
                  minTranslate
                ) {
                  return current - stepState * (itemWidthState + gap);
                }

                return minTranslate;
              }
            })
          }
          style={{
            bottom: `${itemWidthState / 2 + 15}px`,
            left: `${(itemWidthState * frameSizeState + (frameSizeState - 1) * gap) / 2 + 15}px`,
          }}
        >
          <div className="Carousel__btn-el"></div>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
