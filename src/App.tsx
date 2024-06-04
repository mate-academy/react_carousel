import React from 'react';
import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import { Settings } from './components/Customize/Customize';

const App: React.FC = () => {
  const [settings, setSettings] = useState({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  });

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === 'infinite' ? !settings.infinite : +value;

    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: newValue,
    }));
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel images={images} {...settings} />
      <Settings {...settings} handleChange={handleChange} />
    </div>
  );
};

export default App;
