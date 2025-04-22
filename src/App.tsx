import React, { useState } from 'react';
import './App.scss';

import Carousel from './components/Carousel';
import SettingInput from './components/SettingInput';

const images = [
  '/img/1.png',
  '/img/2.png',
  '/img/3.png',
  '/img/4.png',
  '/img/5.png',
  '/img/6.png',
  '/img/7.png',
  '/img/8.png',
  '/img/9.png',
  '/img/10.png',
];

interface CarouselSettings {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const App: React.FC = () => {
  const [settings, setSettings] = useState<CarouselSettings>({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  });

  const { itemWidth, frameSize, step, animationDuration, infinite } = settings;

  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : Number(value);

    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: newValue,
    }));
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="settings">
        <SettingInput
          id="itemId"
          label="Item width:"
          type="number"
          name="itemWidth"
          value={itemWidth}
          min={130}
          max={230}
          step={10}
          onChange={handleSettingsChange}
        />

        <SettingInput
          id="frameId"
          label="Frame size:"
          type="number"
          name="frameSize"
          value={frameSize}
          min={3}
          max={6}
          onChange={handleSettingsChange}
        />

        <SettingInput
          id="stepId"
          label="Step:"
          type="number"
          name="step"
          value={step}
          min={1}
          max={6}
          onChange={handleSettingsChange}
        />

        <SettingInput
          id="animationDurationId"
          label="Animation duration:"
          type="number"
          name="animationDuration"
          value={animationDuration}
          min={1000}
          max={2000}
          onChange={handleSettingsChange}
        />

        <div className="settings__wrapper">
          <label htmlFor="infiniteId">Infinite:</label>
          <input
            id="infiniteId"
            className="App__form--input"
            type="checkbox"
            name="infinite"
            checked={infinite}
            onChange={handleSettingsChange}
          />
        </div>
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
