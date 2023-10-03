import React from 'react';
import './Info.scss';

type Props = {
  onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  imagesLength: number,
};

export const Info: React.FC<Props> = ({
  onHandleChange,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  imagesLength,
}) => {
  return (
    <div className="info">
      <ul className="info__list">
        <li>
          <label
            className="info__label"
            htmlFor="itemWidth"
          >
            Item Width :
            <br />
            <input
              type="number"
              id="itemWidth"
              min={30}
              max={260}
              step={10}
              value={`${itemWidth}`}
              onChange={onHandleChange}
              name="itemWidth"
            />
          </label>

        </li>

        <li>
          <label
            className="info__label"
            htmlFor="frameSize"
          >
            Frame Size :
            <br />
            <input
              type="number"
              id="frameSize"
              min={1}
              step={1}
              max={imagesLength}
              value={`${frameSize}`}
              onChange={onHandleChange}
              name="frameSize"
            />
          </label>
        </li>

        <li>
          <label
            className="info__label"
            htmlFor="step"
          >
            Step :
            <br />
            <input
              type="number"
              id="step"
              min={1}
              value={`${step}`}
              onChange={onHandleChange}
              name="step"
            />
          </label>
        </li>

        <li>
          <label
            className="info__label"
            htmlFor="animationDuration"
          >
            Animation Duration :
            <br />
            <input
              type="number"
              id="animationDuration"
              min={100}
              step={100}
              value={`${animationDuration}`}
              onChange={onHandleChange}
              name="animationDuration"
            />
          </label>
        </li>
      </ul>
    </div>
  );
};
