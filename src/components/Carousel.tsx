import React, { useMemo, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

const Carousel: React.FC<Props> = ({
  images,
  itemWidth: initialItemWidth = 130,
  frameSize: initialFrameSize = 3,
  step: initialStep = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [itemWidth, setItemWidth] = useState(initialItemWidth);
  const [frameSize, setFrameSize] = useState(initialFrameSize);
  const [step, setStep] = useState(initialStep);
  const [animMs, setAnimMs] = useState(animationDuration);

  const [index, setIndex] = useState(0);
  const maxStart = Math.max(0, images.length - frameSize);

  const canPrev = infinite ? images.length > 0 : index > 0;
  const canNext = infinite ? images.length > 0 : index < maxStart;

  const goPrev = () => {
    if (!canPrev) {
      return;
    }

    if (infinite) {
      const next = (index - step) % images.length;

      setIndex(next < 0 ? next + images.length : next);
    } else {
      setIndex(clamp(index - step, 0, maxStart));
    }
  };

  const goNext = () => {
    if (!canNext) {
      return;
    }

    if (infinite) {
      setIndex((index + step) % images.length);
    } else {
      setIndex(clamp(index + step, 0, maxStart));
    }
  };

  const frameStyle: React.CSSProperties = useMemo(
    () => ({
      width: `${frameSize * itemWidth}px`,
      overflow: 'hidden',
    }),
    [frameSize, itemWidth],
  );

  const trackStyle: React.CSSProperties = useMemo(
    () => ({
      width: `${images.length * itemWidth}px`,
      transform: `translateX(${-index * itemWidth}px)`,
      transition: `transform ${animMs}ms`,
    }),
    [images.length, itemWidth, index, animMs],
  );

  const onItemWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;

    setItemWidth(Math.max(1, val));
    setIndex(0);
  };

  const onFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;

    setFrameSize(Math.max(1, val));
    setIndex(0);
  };

  const onStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;

    setStep(Math.max(1, val));
    setIndex(0);
  };

  const onAnimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;

    setAnimMs(Math.max(0, val));
  };

  return (
    <div className="Carousel">
      <div className="Carousel__panel">
        <label htmlFor="itemId">itemWidth</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={onItemWidthChange}
        />

        <label htmlFor="frameId">frameSize</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={onFrameSizeChange}
        />

        <label htmlFor="stepId">step</label>
        <input id="stepId" type="number" value={step} onChange={onStepChange} />

        <label htmlFor="animId">animationDuration</label>
        <input
          id="animId"
          type="number"
          value={animMs}
          onChange={onAnimChange}
        />
      </div>

      <div className="Carousel__frame" style={frameStyle}>
        <ul className="Carousel__track" style={trackStyle}>
          {images.map((src, i) => (
            <li
              className="Carousel__item"
              key={src + i}
              style={{ width: `${itemWidth}px` }}
            >
              <img
                className="Carousel__img"
                src={src}
                alt={`${i + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__controls">
        <button
          type="button"
          className={`Carousel__btn Carousel__btn--prev ${
            !canPrev && !infinite ? 'disabled' : ''
          }`}
          onClick={goPrev}
          data-cy="prev"
          aria-disabled={!canPrev && !infinite ? 'true' : 'false'}
        >
          Prev
        </button>

        <button
          type="button"
          className={`Carousel__btn Carousel__btn--next ${
            !canNext && !infinite ? 'disabled' : ''
          }`}
          onClick={goNext}
          data-cy="next"
          aria-disabled={!canNext && !infinite ? 'true' : 'false'}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
