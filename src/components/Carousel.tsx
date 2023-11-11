import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProp = {
  images: string[];
  step: number
  frameSize: number;
  itemWidth: number;
  count: number;
  animationDuration:number;
  countChange: (value: number) => void;
};

const Carousel: React.FC<CarouselProp> = ({
  images,
  frameSize,
  itemWidth,
  step,
  count,
  animationDuration,
  countChange,
}) => {
  const widthContainer = frameSize * itemWidth;
  const muvStep = itemWidth * step;
  let disabledButtonNext = false;
  let disabledButtonPrev = false;
  const prevValue = ((images.length - frameSize) - count);
  const [muveNext, setMuveNext] = useState(0);

  if (count <= 0) {
    disabledButtonNext = true;
  }

  if (count === images.length - frameSize) {
    disabledButtonPrev = true;
  }

  const muvNextEmoticon = () => {
    let muv = 0;

    if (count <= 0) {
      return;
    }

    if (count < step) {
      setMuveNext(muveNext + itemWidth * count);
      countChange(0);
    } else {
      if (muveNext === 0) {
        muv += muvStep;
        countChange(count - step);
      } else {
        muv += muveNext + muvStep;
        countChange(count - step);
      }

      setMuveNext(muv);
    }
  };

  const muvPrevEmoticon = () => {
    let muv = 0;

    if (count < images.length - count) {
      muv = muveNext - muvStep;
      countChange(count + step);

      if (muveNext > 0) {
        setMuveNext(muv);
      }
    } else {
      setMuveNext(0);
      countChange(count + prevValue);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${widthContainer}px`,
        }}
      >
        <ul
          style={{
            transform: `translateX(-${muveNext}px)`,
            transition: `all ${animationDuration}ms`,
          }}
          className="Carousel__list"
        >
          {
            images.map((img: string, index: number) => (
              <li
                className="Carousel__item"
                key={img}
              >
                <img
                  className="Carousel__img"
                  src={img}
                  alt={`${index + 1}`}
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                />
              </li>
            ))
          }
        </ul>
      </div>
      <div className="Carousel__wraper">
        <button
          className="Carousel__button"
          type="button"
          disabled={disabledButtonPrev}
          onClick={() => muvPrevEmoticon()}
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          data-cy="next"
          type="button"
          onClick={() => muvNextEmoticon()}
          disabled={disabledButtonNext}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Carousel;
