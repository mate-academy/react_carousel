/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './CarouselInputs.scss';
import { Setting } from '../../type/type';

type Props = {
  settings: Setting,
  change: (e: React.ChangeEvent<HTMLInputElement>, keyName: keyof Setting) => void,
  length: number,
};

const CarouselInputs: React.FC<Props> = ({ settings, change, length }) => {
  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
  } = settings;

  return (
    <div className="inputs">
      <h2
        style={{
          margin: '10px auto',
        }}
      >
        Change parameters here:
      </h2>

      <div className="inputs__item">
        <span>
          Scroll steps (from 1 to
          {` ${length}`}
          )
        </span>

        <div
          className="inputs__input"
        >
          <input
            type="range"
            name="step"
            min="1"
            max={`${length}`}
            value={`${step}`}
            onChange={(e) => change(e, 'step')}
          />

          <span>
            {step}
          </span>
        </div>
      </div>

      <div className="inputs__item">
        <span>
          Quantity of images in box (from 1 to
          {` ${length}`}
          )
        </span>

        <div
          className="inputs__input"
        >
          <input
            type="range"
            name="frameSize"
            min="1"
            max={`${length}`}
            value={`${frameSize}`}
            onChange={(e) => change(e, 'frameSize')}
          />

          <span>
            {frameSize}
          </span>
        </div>
      </div>

      <div className="inputs__item">
        <span>
          Image size (from 50 to 360, step 10)
        </span>

        <div
          className="inputs__input"
        >
          <input
            type="range"
            name="itemWidth"
            min="50"
            max="360"
            step="10"
            value={`${itemWidth}`}
            onChange={(e) => change(e, 'itemWidth')}
          />

          <span>
            {itemWidth}
          </span>
        </div>
      </div>

      <div className="inputs__item">
        <span>
          Animation speed (from 100 to 2000, step 100)
        </span>

        <div
          className="inputs__input"
        >
          <input
            type="range"
            name="animationDuration"
            min="100"
            max="2000"
            step="100"
            value={`${animationDuration}`}
            onChange={(e) => change(e, 'animationDuration')}
          />

          <span>
            {animationDuration}
          </span>
        </div>
      </div>

      <div className="inputs__item">
        <span>
          Do you want Infinity scroll?
        </span>

        <label
          className="inputs__checkbox"
        >
          <input
            type="checkbox"
            name="infinite"
            onChange={(e) => change(e, 'infinite')}
          />
          Yes
        </label>
      </div>
    </div>
  );
};

export default CarouselInputs;
