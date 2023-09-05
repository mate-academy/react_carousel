import React, { useState } from 'react';

import './Carousel.scss';

import { Image } from '../types/Image';
import { Params } from '../types/Params';

type Props = {
  images: Image[],
  params: Params,
  changedCarousel: (key: string, value: number | boolean) => void,
};

const Carousel: React.FC<Props> = ({
  images,
  params,
  changedCarousel,
}) => {
  const [firstItem, setFirstItem] = useState(1);

  const styleForCarousel = {
    width: `${params.itemWidth * params.frameSize}px`,
    transition: `${params.animationDuration}ms`,
  };

  const styleContainerImage = {
    transform: `translateX(${-params.itemWidth * (firstItem - 1)}px)`,
    transition: `transform ${params.animationDuration}ms`,
  };

  const disabledForNextButton = (!params.infinite
    && (firstItem === (images.length - params.frameSize + 1)))
    || params.frameSize === images.length;

  const disabledForPrevButton = firstItem === 1 && !params.infinite;

  const styleImage = {
    width: `${params.itemWidth}px`,
    height: `${params.itemWidth}px`,
    maxWidth: 'fit-content',
  };

  const nextButton = () => {
    let nextItem = firstItem + params.step;

    if ((nextItem + params.frameSize) > images.length) {
      nextItem = images.length - params.frameSize + 1;
    }

    if (params.infinite && (firstItem === nextItem)) {
      nextItem = 1;
    }

    setFirstItem(nextItem);
  };

  const prevButton = () => {
    let prevItem = firstItem - params.step;

    if (prevItem < 1) {
      prevItem = 1;
    }

    if (params.infinite && (firstItem === prevItem)) {
      prevItem = 10 - (params.step - 1);
    }

    setFirstItem(prevItem);
  };

  const changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    changedCarousel('frameSize', +event.target.value);

    if ((params.frameSize + firstItem) > images.length) {
      if ((images.length - params.frameSize) > 0) {
        setFirstItem(images.length - params.frameSize);
      } else {
        setFirstItem(1);
      }
    }
  };

  const handleOnChange = (input: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = +event.target.value;

    changedCarousel(input, value);

    if (input === 'frameSize' && (value + firstItem) > images.length) {
      if ((images.length - value) > 0) {
        setFirstItem(images.length - value);
      } else {
        setFirstItem(1);
      }
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__images"
        style={styleForCarousel}
      >
        <ul className="Carousel__list">
          {images.map(currentImage => (
            <li
              key={currentImage.id}
              style={styleContainerImage}
            >
              <img
                style={styleImage}
                src={currentImage.url}
                alt={currentImage.id.toFixed()}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__form">
        <div className="Carousel__button-section">
          <button
            className="button is-primary"
            type="button"
            onClick={prevButton}
            disabled={disabledForPrevButton}
          >
            Prev
          </button>

          <button
            className="button is-primary"
            type="button"
            onClick={nextButton}
            disabled={disabledForNextButton}
          >
            Next
          </button>
        </div>

        <div className="form">
          <label
            className="label"
            htmlFor="step"
          >
            <span>
              Step
            </span>

            <input
              type="number"
              name="step"
              className="input"
              min={1}
              value={params.step}
              max={images.length - 1}
              onChange={handleOnChange('step')}
            />
          </label>

          <label
            className="label"
            htmlFor="frameSize"
          >
            <span>
              Frame size
            </span>

            <input
              type="number"
              name="frameSize"
              className="input"
              min={1}
              max={images.length}
              value={params.frameSize}
              onChange={changeFrameSize}
            />
          </label>

          <label
            className="label"
            htmlFor="itemWidth"
          >
            <span>
              Item width
            </span>

            <input
              type="number"
              name="itemWidth"
              className="input"
              min={100}
              max={600}
              step={20}
              value={params.itemWidth}
              onChange={handleOnChange('itemWidth')}
            />
          </label>

          <label
            className="label"
            htmlFor="animationDuration"
          >
            <span>
              Animation duration
            </span>

            <input
              type="number"
              name="animationDuration"
              className="input"
              min={100}
              max={3000}
              step={500}
              value={params.animationDuration}
              onChange={handleOnChange('animationDuration')}
            />
          </label>

          <label className="label">
            Infinity:
            <input
              name="infinity"
              type="checkbox"
              className="checkbox"
              defaultChecked={params.infinite}
              onChange={(e) => changedCarousel('infinite', e.target.checked)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
