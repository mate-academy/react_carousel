import React from 'react';
import './ControlPanel.scss';

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
  const options = [
    {
      title: 'Item width',
      name: 'itemWidth',
      id: 'width',
      defaultValue: defaultItemWidth,
      min: '50',
      max: '350',
      step: '10',
    },
    {
      title: 'Frame size',
      name: 'frameSize',
      id: 'frameSize',
      defaultValue: defaultFrameSize,
      min: '1',
      max: imagesCount,
      step: '1',
    },
    {
      title: 'Step',
      name: 'step',
      id: 'step',
      defaultValue: defaultStep,
      min: '1',
      max: '5',
      step: '1',
    },
    {
      title: 'Animation Duration',
      name: 'animationDuration',
      id: 'animationDuration',
      defaultValue: defaultAnimationDuration,
      min: '0',
      max: '5000',
      step: '500',
    },
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
