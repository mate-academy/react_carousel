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

const App: React.FC = () => {
  const [settings, setSettings] = useState({
    itemId: 130,
    frameId: 3,
    stepId: 3,
    animationDuration: 1000,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [event.target.id]: Number(event.target.value),
    });
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="inputs">
        <div className="input-wrapper">
          <label htmlFor="itemId">Item Width:</label>
          <input
            id="itemId"
            type="number"
            value={settings.itemId}
            onChange={handleChange}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="frameId">Frame Size:</label>
          <input
            id="frameId"
            type="number"
            value={settings.frameId}
            onChange={handleChange}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            value={settings.stepId}
            onChange={handleChange}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="animationDuration">Animation Duration:</label>
          <input
            id="animationDuration"
            type="number"
            value={settings.animationDuration}
            onChange={handleChange}
          />
        </div>
      </div>

      <Carousel images={images} {...settings} />
    </div>
  );
};

export default App;
