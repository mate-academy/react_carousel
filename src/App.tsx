import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

type Settings = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  });
  const { itemWidth, frameSize, step, animationDuration, infinite } = settings;

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
        <div className="settings__wrapper">
          <label htmlFor="itemId">Item width:</label>
          <input
            id="itemId"
            type="number"
            min="130"
            max="230"
            step="10"
            name="itemWidth"
            value={itemWidth}
            onChange={handleSettingsChange}
          />
        </div>
        <div className="settings__wrapper">
          <label htmlFor="frameId">Frame size:</label>
          <input
            id="frameId"
            type="number"
            min="3"
            max="6"
            name="frameSize"
            value={frameSize}
            onChange={handleSettingsChange}
          />
        </div>
        <div className="settings__wrapper">
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            min="1"
            max="6"
            name="step"
            value={step}
            onChange={handleSettingsChange}
          />
        </div>
        <div className="settings__wrapper">
          <label htmlFor="animationDurationId">Animation duration:</label>
          <input
            id="animationDurationId"
            type="number"
            min="1000"
            max="2000"
            name="animationDuration"
            value={animationDuration}
            onChange={handleSettingsChange}
          />
        </div>
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
