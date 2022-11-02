import React from 'react';
import './ControlPanel.scss';
import { OptionInterface } from '../types/Option';

type Props = {
  onChangeOptions: (option: string, value: number) => void;
  imagesCount: number;
  defaultFrameSize: number;
  defaultItemWidth: number;
  defaultStep: number;
  defaultAnimationDuration: number,
};

export const ControlPanel: React.FC<Props> = (
  {
    onChangeOptions,
    imagesCount,
    defaultFrameSize,
    defaultItemWidth,
    defaultStep,
    defaultAnimationDuration,
  },
) => {
  class Option implements OptionInterface {
    constructor(
      public title: string,
      public name: string,
      public id: string,
      public defaultValue: number,
      public min: string,
      public max: string,
      public step: string,
    ) {}
  }

  const optionWidth = new Option(
    'Item width',
    'itemWidth',
    'width',
    defaultItemWidth,
    '50',
    '350',
    '10',
  );

  const optionFrameSize = new Option(
    'Frame size',
    'frameSize',
    'frameSize',
    defaultFrameSize,
    '1',
    `${imagesCount}`,
    '1',
  );

  const optionStep = new Option(
    'Step',
    'step',
    'step',
    defaultStep,
    '1',
    '5',
    '1',
  );

  const optionAnimationDuration = new Option(
    'Animation Duration',
    'animationDuration',
    'animationDuration',
    defaultAnimationDuration,
    '0',
    '5000',
    '500',
  );

  const options = [
    optionWidth,
    optionFrameSize,
    optionStep,
    optionAnimationDuration,
  ];

  return (
    <div className="control-panel">
      {options.map(option => (
        <label htmlFor={option.id} key={option.id}>
          {option.title}
          <input
            type="range"
            id={option.id}
            name={option.name}
            defaultValue={option.defaultValue}
            min={option.min}
            max={option.max}
            step={option.step}
            onChange={event => (
              onChangeOptions(event.target.name, +event.target.value)
            )}
          />
        </label>
      ))}
    </div>
  );
};
