import React from 'react';
import './Options.scss';

interface Props {
  options: [string, number, React.Dispatch<React.SetStateAction<number>>][];
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>,
  imagesLength: number;
}

export const Options: React.FC<Props> = ({
  options,
  setCurrentSlide,
  imagesLength,
}) => (
  <div className="Options">
    {options.map(option => {
      const [optionName, optionValue, setOption] = option;

      const minItemWidth = optionName === 'itemWidth' ? 100 : null;
      const minDuration = optionName === 'animationDuration' ? 300 : null;

      const maxItemWidth = optionName === 'itemWidth' ? 200 : null;
      const maxFrameSize = optionName === 'frameSize' ? imagesLength - 1 : null;
      const maxDuration = optionName === 'animationDuration' ? 1200 : null;
      const maxStep = optionName === 'step'
        ? imagesLength - options[1][1] : null;

      const changeOption = (target: EventTarget & HTMLInputElement) => {
        const targetMin = +target.min;
        const targetMax = +target.max;
        let targetValue = +target.value;

        if (targetValue < targetMin) {
          targetValue = targetMin;
        }

        if (targetValue > targetMax) {
          targetValue = targetMax;
        }

        setOption(targetValue);
        setCurrentSlide(0);
      };

      return (
        <div className="Options__option" key={optionName.toString()}>
          <label
            className="Options__label"
            htmlFor={optionName.toString()}
          >
            {optionName}
          </label>
          <input
            id={optionName.toString()}
            className="Options__input"
            type="number"
            name={optionName.toString()}
            placeholder={optionName.toString()}
            min={
              minItemWidth?.toString()
              || minDuration?.toString()
              || 1
            }
            max={
              maxItemWidth?.toString()
              || maxFrameSize?.toString()
              || maxStep?.toString()
              || maxDuration?.toString()
            }
            value={optionValue}
            onChange={({ target }) => changeOption(target)}
          />
        </div>
      );
    })}
  </div>
);
