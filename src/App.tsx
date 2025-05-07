import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images?: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}
const images = [
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/7.png',
  './img/8.png',
  './img/9.png',
  './img/10.png',
];

const App: React.FC = () => {
  const [settings, setSettings] = useState<State>({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  });

  const { itemWidth, frameSize, step, animationDuration, infinite } = settings;

  const settingsInputs = [
    {
      label: 'Item width:',
      id: 'itemId',
      name: 'itemWidth',
      type: 'number',
      min: 130,
      max: 230,
      inputStep: 10,
      value: itemWidth,
    },
    {
      label: 'Frame size:',
      id: 'frameId',
      name: 'frameSize',
      type: 'number',
      min: 3,
      max: 6,
      value: frameSize,
    },
    {
      label: 'Step:',
      id: 'stepId',
      name: 'step',
      type: 'number',
      min: 1,
      max: 6,
      value: step,
    },
    {
      label: 'Animation duration:',
      id: 'animationDurationId',
      name: 'animationDuration',
      type: 'number',
      min: 1000,
      max: 2000,
      value: animationDuration,
    },
    {
      label: 'Infinite:',
      id: 'infiniteId',
      type: 'checkbox',
      name: 'infinite',
      checked: infinite,
    },
  ];

  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;

    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : +value,
    }));
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <div className="settings">
        {settingsInputs.map(
          ({ label, id, name, type, min, max, inputStep, value }) => (
            <div className="settings__input" key={id}>
              <label htmlFor={id}>{label}</label>
              <input
                id={id}
                name={name}
                type={type}
                min={min}
                max={max}
                step={inputStep}
                value={value}
                onChange={handleSettingsChange}
                checked={type === 'checkbox' ? infinite : undefined}
              />
            </div>
          ),
        )}
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
