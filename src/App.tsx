import React, { useState } from 'react';
import './App.scss';
import { State } from './types/State';
import Carousel from './components/Carousel';

const App: React.FC = () => {
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

  const initialSettingsState = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  const [settings, setSettings] = useState<State>(initialSettingsState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: parseInt(value, 10),
    }));
  };

  const handleInputChangeInfinity = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      infinite: !prevSettings.infinite,
    }));
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1
        className='App__title'
        data-cy='title'
      >
        Carousel with {images.length} images
      </h1>

      <Carousel
        images={images}
        step={settings.step}
        frameSize={settings.frameSize}
        itemWidth={settings.itemWidth}
        animationDuration={settings.animationDuration}
        infinite={settings.infinite}
      />

      <div className="App__container">
        <div className="App__input-wrapper">
          <p className="App__input-title">Item width:</p>
          <input
            className="App__input"
            id="itemId"
            type="number"
            name="itemWidth"
            value={settings.itemWidth}
            onChange={handleInputChange}
            min={130}
            max={500}
            step={10}
          />
        </div>

        <div className="App__input-wrapper">
          <p className="App__input-title">Frame size:</p>
          <input
            className="App__input"
            id="itemId"
            type="number"
            name="frameSize"
            value={settings.frameSize}
            onChange={handleInputChange}
            min={0}
            max={10}
            step={1}
          />
        </div>

        <div className="App__input-wrapper">
          <p className="App__input-title">Step:</p>
          <input
            className="App__input"
            id="itemId"
            type="number"
            name="step"
            value={settings.step}
            onChange={handleInputChange}
            min={1}
            max={9}
          />
        </div>

        <div className="App__input-wrapper">
          <p className="App__input-title">Animation duration:</p>
          <input
            className="App__input"
            id="itemId"
            type="number"
            name="animationDuration"
            value={settings.animationDuration}
            onChange={handleInputChange}
            min={1000}
            step={500}
          />
        </div>

        <div className="App__input-wrapper">
          <p className="App__input-title">Infinite:</p>
          <input
            className="App__input"
            id="itemId"
            type="checkbox"
            onChange={handleInputChangeInfinity}
            checked={settings.infinite}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
