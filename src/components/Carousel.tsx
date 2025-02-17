import React, { useState } from 'react';
import './Carousel.scss';

type Prop = {
  images: string[];
};

const DEFAULT_SLIDE = 1;
const DEFAULT_WIDTH = 130;
const DEFAULT_FRAME = 3;
const DEFAULT_STEP = 3;
const DEFAULT_DURATION = 1000;

const Carousel: React.FC<Prop> = ({ images }) => {
  const [slide, setSlide] = useState(DEFAULT_SLIDE);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [frame, setFrame] = useState(DEFAULT_FRAME);
  const [step, setStep] = useState(DEFAULT_STEP);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [infinite, setInfinite] = useState(false);

  function next() {
    const lastSlide = images.length - frame + 1;

    if (infinite && slide === lastSlide) {
      setSlide(1);

      return;
    }

    const shift = slide + step > lastSlide ? lastSlide : slide + step;

    setSlide(shift);
  }

  function prev() {
    const lastSlide = images.length - frame + 1;

    if (infinite && slide === 1) {
      setSlide(lastSlide);

      return;
    }

    const shift = slide - step < 1 ? 1 : slide - step;

    setSlide(shift);
  }

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${width * frame}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-(slide - 1) * width}px)`,
            transition: `transform ${duration}ms`,
          }}
        >
          {images.map(imgSrc => (
            <li key={imgSrc}>
              <img
                src={imgSrc}
                alt={imgSrc.slice(-5)}
                style={{
                  width: `${width}px`,
                  height: `${width}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button type="button" onClick={() => prev()}>
          Prev
        </button>
        <button type="button" onClick={() => next()} data-cy="next">
          Next
        </button>
      </div>

      <div className="Carousel__labels">
        <label className="Carousel__label">
          Item width :
          <input
            type="number"
            defaultValue={DEFAULT_WIDTH}
            onChange={e => setWidth(+e.target.value)}
          />
        </label>
        <label className="Carousel__label">
          Frame size :
          <input
            type="number"
            defaultValue={DEFAULT_FRAME}
            onChange={e => setFrame(+e.target.value)}
          />
        </label>
        <label className="Carousel__label">
          Step :
          <input
            type="number"
            defaultValue={DEFAULT_STEP}
            onChange={e => setStep(+e.target.value)}
          />
        </label>
        <label className="Carousel__label">
          Animation duration :
          <input
            type="number"
            defaultValue={DEFAULT_DURATION}
            onChange={e => setDuration(+e.target.value)}
          />
        </label>
        <label className="Carousel__label">
          Infinite :
          <input type="checkbox" onClick={() => setInfinite(!infinite)} />
        </label>
      </div>
    </div>
  );
};

export default Carousel;
