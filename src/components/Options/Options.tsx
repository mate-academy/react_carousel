import React from 'react';
import './Options.scss';

interface Props {
  options: {
    name: string;
    placeholder: string;
    min: number;
    max: number;
    value: number;
    set: React.Dispatch<React.SetStateAction<number>>;
  }[];
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>,
}

export const Options: React.FC<Props> = ({
  options,
  setCurrentSlide,
}) => (
  <div className="Options">
    {options.map(option => {
      const {
        name: optionName,
        placeholder: optionPlaceholder,
        min: optionMin,
        max: optionMax,
        value: optionValue,
        set: optionSet,
      } = option;

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

        optionSet(targetValue);
        setCurrentSlide(0);
      };

      return (
        <div className="Options__option" key={optionName}>
          <label
            className="Options__label"
            htmlFor={optionName}
          >
            {optionPlaceholder}
          </label>
          <input
            id={optionName}
            className="Options__input"
            type="number"
            name={optionName}
            min={optionMin}
            max={optionMax}
            value={optionValue}
            onChange={({ target }) => changeOption(target)}
          />
        </div>
      );
    })}
  </div>
);
