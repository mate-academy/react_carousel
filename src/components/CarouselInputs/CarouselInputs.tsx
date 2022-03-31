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
    infinite,
  } = settings;

  return (
    <div className="inputs">
      <h2>
        Change parameters here:
      </h2>

      <div className="inputs__item">
        <span>
          Scroll steps (from 1 to
          {` ${length}`}
          )
        </span>
        <input
          type="number"
          name="step"
          className="inputs__input"
          min="1"
          max={`${length}`}
          value={`${step}`}
          onChange={(e) => change(e, 'step')}
        />
      </div>

      <div className="inputs__item">
        <span>
          Quantity of images in box (from 1 to
          {` ${length}`}
          )
        </span>
        <input
          type="number"
          name="frameSize"
          className="inputs__input"
          min="1"
          max={`${length}`}
          value={`${frameSize}`}
          onChange={(e) => change(e, 'frameSize')}
        />
      </div>

      <div className="inputs__item">
        <span>
          Image size (from 50 to 360, step 10)
        </span>
        <input
          type="number"
          name="itemWidth"
          className="inputs__input"
          min="50"
          max="360"
          step="10"
          value={`${itemWidth}`}
          onChange={(e) => change(e, 'itemWidth')}
        />
      </div>

      <div className="inputs__item">
        <span>
          Animation speed (from 100 to 2000, step 100)
        </span>
        <input
          type="number"
          name="animationDuration"
          className="inputs__input"
          min="100"
          max="2000"
          step="100"
          value={`${infinite ? 0 : animationDuration}`}
          onChange={(e) => change(e, 'animationDuration')}
        />
      </div>

      <div className="inputs__item">
        <span>
          Infinity scroll or not (0 = No, 1 = Yes)
        </span>
        <input
          type="number"
          name="infinite"
          className="inputs__input"
          min="0"
          max="1"
          value={`${+infinite}`}
          onChange={(e) => change(e, 'infinite')}
        />
      </div>
    </div>
  );
};

export default CarouselInputs;
