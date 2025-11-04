import React, { useState } from 'react';
import './Carousel.scss';

type CarouselType = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}: CarouselType) => {
  const initialImages = images;
  const [currImages, setImages] = useState(images);
  const [currItemWidth, setItemWidth] = useState(itemWidth);
  const [currStep, setStep] = useState(step * currItemWidth);
  const [currX, setCurrX] = useState(-40);
  const [currMoves, setCurrMoves] = useState<number>(0);
  const [currFrameSize, setFrameSize] = useState(frameSize);
  const [currFrameSizePx, setFrameSizePx] = useState(
    currFrameSize * currItemWidth - 40,
  );
  const [currAnimationDuration, setAnimationDuration] =
    useState(animationDuration);
  const [lastMove, setLastMove] = useState(
    Math.floor((currImages.length - 1) / step),
  );

  let gensCount = 0;

  function frameSizeSetter(
    size: number,
    actualItemWidth: number = currItemWidth,
  ) {
    const resSize = size * actualItemWidth - 40;

    setFrameSize(size);
    setFrameSizePx(resSize);
  }

  function stepSetter(size: number, actualItemWidth: number = currItemWidth) {
    const newLastMove = Math.floor((currImages.length - 1) / size);

    setStep(size * actualItemWidth);
    setLastMove(newLastMove);
    setCurrMoves(0);
    setCurrX(-40);
  }

  function itemWidthSetter(width: number) {
    const currStepSize = currStep / currItemWidth;

    frameSizeSetter(currFrameSize, width);
    setItemWidth(width);
    stepSetter(currStepSize, width);
  }

  return (
    <div className="Carousel">
      <div className="Carousel__inputs">
        <label htmlFor="itemWidth">Item Width:</label>
        <input
          type="number"
          className="Carousel__input"
          id="itemWidth"
          onChange={ev => {
            const val = ev.target.value;

            if (val.length > 0) {
              itemWidthSetter(+val);
            } else {
              itemWidthSetter(itemWidth);
            }
          }}
        />

        <label htmlFor="frameWidth">Frame Width:</label>
        <input
          type="number"
          className="Carousel__input"
          id="frameWidth"
          onChange={ev => {
            const val = ev.target.value;

            if (val.length > 0) {
              frameSizeSetter(+val);
            } else {
              frameSizeSetter(frameSize);
            }
          }}
        />

        <label htmlFor="step">Step:</label>
        <input
          type="number"
          className="Carousel__input"
          id="step"
          onChange={ev => {
            const val = ev.target.value;

            if (val.length > 0) {
              stepSetter(+val);
            } else {
              stepSetter(step);
            }
          }}
        />

        <label htmlFor="animationDur">Animation Duration:</label>
        <input
          type="number"
          className="Carousel__input"
          id="animationDur"
          onChange={ev => {
            const val = ev.target.value;

            if (val.length > 0) {
              setAnimationDuration(+val);
            } else {
              setAnimationDuration(animationDuration);
            }
          }}
        />
      </div>

      <ul
        className="Carousel__list"
        style={{ width: `${currFrameSizePx}px`, height: `${currItemWidth}px` }}
      >
        {currImages.map(image => {
          const lastItem = initialImages[initialImages.length - 1];
          const origIndex = image.replace(/\D/g, '');

          return (
            <li
              className="image-wrapper"
              key={
                gensCount >= 0
                  ? `orig-${origIndex}::clone-${gensCount}`
                  : `orig-${origIndex}`
              }
              style={{
                width: `${currItemWidth}px`,
                transform: `translateX(${currX}px)`,
                transition: `transform ${currAnimationDuration}ms`,
              }}
            >
              <img src={image} alt={image} className="image" />
              {image === lastItem && gensCount++}
            </li>
          );
        })}
      </ul>

      <button
        disabled={currMoves <= 0}
        data-cy="prev"
        type="button"
        onClick={() => {
          setCurrX(currX + currStep);
          setCurrMoves(currMoves - 1);
        }}
      >
        Prev
      </button>
      <button
        disabled={!infinite ? currMoves >= lastMove : false}
        data-cy="next"
        type="button"
        onClick={() => {
          setCurrX(currX + currStep * -1);
          setCurrMoves(currMoves + 1);

          if (infinite && currMoves >= lastMove - 1) {
            setImages([...currImages, ...initialImages]);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
