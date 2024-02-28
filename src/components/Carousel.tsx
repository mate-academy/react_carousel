import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

let animation: NodeJS.Timer;
let scrolled = 0;

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [scroll, setScroll] = useState(0);
  const [stepOfScroll, setStep] = useState(step);
  const [frameWidth, setFrameWidth] = useState(frameSize);
  const [imageWidth, setItemWidth] = useState(itemWidth);
  const [durationAnimation, setDurationAnimation] = useState(animationDuration);
  const [infiniteMode, setInfiniteMide] = useState(infinite);

  const totalWidth = images.length * imageWidth;
  const scrollNeededSpace = imageWidth * stepOfScroll;
  const freeScrollSpace = totalWidth - imageWidth * frameWidth;

  const launcher = () => {
    animation = setInterval(() => {
      if (scrolled < totalWidth - scrollNeededSpace) {
        if (scrolled + scrollNeededSpace > freeScrollSpace) {
          scrolled = freeScrollSpace;
          setScroll(freeScrollSpace);
        } else {
          scrolled += scrollNeededSpace;
          setScroll(prev => prev + scrollNeededSpace);
        }
      } else {
        scrolled = 0;
        setScroll(0);
      }
    }, durationAnimation);
  };

  const buttonClassNext = cn({
    button: true,
    'ml-5': true,
    'is-primary': infiniteMode || scroll !== freeScrollSpace,
  });

  const buttonClassPrev = cn({
    button: true,
    'is-primary': infiniteMode || scroll > 0,
  });

  const prevDisabled = cn({
    disabled: !infiniteMode && scroll === 0,
  });

  const nextDisabled = cn({
    disabled: !infiniteMode && scroll === freeScrollSpace,
  });

  return (
    <>
      <div className="Carousel box">
        <div
          className="Carousel__container"
          style={{ width: frameWidth * imageWidth }}
        >
          <ul
            className="Carousel__list is-flex"
            id="images-list"
            style={{
              transform: `translateX(${-scroll}px)`,
              transition: `transform ${durationAnimation}ms`,
            }}
          >
            {images.map((image, index) => (
              <li className="Carousel__item" key={image}>
                <img
                  className="Carousel__image"
                  src={image}
                  alt={`${index + 1}`}
                  width={imageWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons mt-5">
          <button
            className={buttonClassPrev}
            type="button"
            disabled={!!prevDisabled}
            onClick={() => {
              if (scroll > 0) {
                if (scroll - scrollNeededSpace < 0) {
                  setScroll(0);
                } else {
                  setScroll(scroll - scrollNeededSpace);
                }
              } else {
                setScroll(freeScrollSpace);
              }
            }}
          >
            Prev
          </button>

          <button
            data-cy="next"
            className={buttonClassNext}
            type="button"
            disabled={!!nextDisabled}
            onClick={() => {
              if (scroll < totalWidth - scrollNeededSpace) {
                if (scroll + scrollNeededSpace > freeScrollSpace) {
                  setScroll(freeScrollSpace);
                } else {
                  setScroll(scroll + scrollNeededSpace);
                }
              } else {
                setScroll(freeScrollSpace);
              }

              if (infiniteMode && scroll === freeScrollSpace) {
                setScroll(0);
              }
            }}
          >
            Next
          </button>
        </div>
      </div>

      <div className="Carousel__equalizer box mt-5">
        <div className="Carousel__inputs">
          <label htmlFor="stepId" className="label">
            Step of scroll (pcs)
            <input
              className="input is-small"
              type="number"
              id="stepId"
              defaultValue={stepOfScroll}
              onChange={e => setStep(+e.target.value)}
            />
          </label>

          <label htmlFor="frameId" className="label">
            Size of frame (pcs)
            <input
              className="input is-small"
              type="number"
              id="frameId"
              defaultValue={frameSize}
              min={1}
              max={images.length}
              onChange={e => {
                const userValue =
                  +e.target.value > images.length ? 10 : +e.target.value;

                setFrameWidth(userValue);
              }}
            />
          </label>

          <label htmlFor="itemId" className="label">
            Width of items (px)
            <input
              className="input is-small"
              type="number"
              id="itemId"
              step={10}
              value={imageWidth}
              onChange={e => setItemWidth(+e.target.value)}
            />
          </label>

          <label htmlFor="animationDuration" className="label">
            Duration of animation (ms)
            <input
              className="input is-small"
              type="number"
              id="animationDuration"
              step={100}
              defaultValue={durationAnimation}
              onChange={e => setDurationAnimation(+e.target.value)}
            />
          </label>

          <label
            htmlFor="infiniteMode"
            className="label is-flex is-justify-content-space-between"
          >
            Infinite mode
            <input
              id="infiniteMode"
              className="checkbox is-small"
              type="checkbox"
              defaultValue={durationAnimation}
              onChange={() => setInfiniteMide(prev => !prev)}
            />
          </label>
        </div>

        <label htmlFor="animationDuration" className="label">
          Launch animation :)
        </label>

        <div
          className="
          Equalizer__buttons
           is-flex
            is-justify-content-space-between
          "
        >
          <button
            className="button is-active is-primary"
            type="button"
            onClick={() => launcher()}
          >
            Start
          </button>
          <button
            className="button is-active is-danger"
            type="button"
            onClick={() => {
              clearInterval(animation);
            }}
          >
            Stop
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
