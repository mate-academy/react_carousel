import React, { useState } from 'react';
import './Carousel.scss';

type Params = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Params> = ({
  images,
  step: initialStep,
  frameSize: initialFrameSize,
  itemWidth: initialItemWidth,
  animationDuration: initialAnimationDuration,
  // TODO: implement infinite scroll
  // infinite,
}) => {
  const [page, setPage] = useState(0);
  const [itemWidth, setItemWidth] = useState(initialItemWidth);
  const [frameSize, setFrameSize] = useState(initialFrameSize);
  const [step, setStep] = useState(initialStep);
  const [animationDuration, setAnimationDuration] = useState(initialAnimationDuration);

  return (
    <>
      <div
        className="Carousel"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${page * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={index} style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}>
              <img src={image} alt={image} />
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            const newPage = page - step;
            if (newPage < 0) {
              setPage(0);
              return;
            } else {
              setPage(newPage);
            }
          }}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          onClick={() => {
            const newPage = page + step;
            if (newPage > images.length - frameSize) {
              setPage(images.length - frameSize);
              return;
            } else {
              setPage(newPage);
            }
          }}
        >
          Next
        </button>
      </div>

      <div className="Carousel__inputs">
        Item width:
        <input
          type="number"
          value={itemWidth}
          onChange={e => {
            const value = Number(e.target.value);
            if (!isNaN(value) && value > 0) {
              setItemWidth(value);
            }
          }}
        />
        Frame size:
        <input
          type="number"
          value={frameSize}
          onChange={e => {
            const value = Number(e.target.value);
            if (!isNaN(value) && value > 0 && value <= images.length) {
              setFrameSize(value);
              if (page > images.length - value) {
                setPage(Math.max(0, images.length - value));
              }
            }
          }}
        />
        Step:
        <input
          type="number"
          value={step}
          onChange={e => {
            const value = Number(e.target.value);
            if (!isNaN(value) && value > 0) {
              setStep(value);
            }
          }}
        />
        Animation duration:
        <input
          type="number"
          value={animationDuration}
          onChange={e => {
            const value = Number(e.target.value);
            if (!isNaN(value) && value >= 0) {
              setAnimationDuration(value);
            }
          }}
        />
      </div>
    </>
  );
};

export default Carousel;
