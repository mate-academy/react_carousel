import React from 'react';
import './Info.scss';

type Props = {
  onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
};

export const Info: React.FC<Props> = ({
  onHandleChange,
  itemWidth,
  frameSize,
  step,
  animationDuration,
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
              onChange={(event) => onHandleChange(event)}
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
              max={3}
              value={`${frameSize}`}
              onChange={(event) => onHandleChange(event)}
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
              onChange={(event) => onHandleChange(event)}
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
              onChange={(event) => onHandleChange(event)}
              name="animationDuration"
            />
          </label>
        </li>
      </ul>
    </div>
  );
};
