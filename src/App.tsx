import React, { useState, ChangeEvent } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import Inputs from './components/Inputs/Inputs';

const imagesLinks = [
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
};

const App: React.FC = () => {
  const [settings, setSettings] = useState(initialSettingsState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {imagesLinks.length} images</h1>

      <Inputs
        images={imagesLinks}
        step={settings.step}
        frameSize={settings.frameSize}
        itemWidth={settings.itemWidth}
        animationDuration={settings.animationDuration}
        setChange={handleInputChange}
      />

      <Carousel
        images={imagesLinks}
        step={settings.step}
        frameSize={settings.frameSize}
        itemWidth={settings.itemWidth}
        animationDuration={settings.animationDuration}
      />
    </div>
  );
};

export default App;
