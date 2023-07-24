import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [carouselSettings, setCarouselSettings] = useState<{
    itemWidth: number;
    step: number;
    frameSize: number;
    animationDuration: number;
  }>({
    itemWidth: 130,
    step: 3,
    frameSize: 3,
    animationDuration: 1000,
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

  const handleSettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setCarouselSettings((prevState) => ({
      ...prevState,
      [id]: +value,
    }));
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1>Carousel with {images.length} images</h1>

      <div className="settings">
        <label htmlFor="itemWidth">
          Adjust image size
          <input
            className="setting"
            id="itemWidth"
            type="number"
            value={carouselSettings.itemWidth}
            min={50}
            onChange={handleSettingChange}
          />
        </label>

        <label htmlFor="step">
          Adjust scroll step
          <input
            className="setting"
            id="step"
            type="number"
            value={carouselSettings.step}
            min={1}
            max={images.length - 1}
            onChange={handleSettingChange}
          />
        </label>

        <label htmlFor="frameSize">
          Adjust frame size
          <input
            className="setting"
            id="frameSize"
            type="number"
            value={carouselSettings.frameSize}
            min={1}
            max={images.length}
            onChange={handleSettingChange}
          />
        </label>

        <label htmlFor="animationDuration">
          Adjust scroll duration
          <input
            className="setting"
            id="animationDuration"
            type="number"
            value={carouselSettings.animationDuration}
            min={0}
            onChange={handleSettingChange}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={carouselSettings.step}
        frameSize={carouselSettings.frameSize}
        itemWidth={carouselSettings.itemWidth}
        animationDuration={carouselSettings.animationDuration}
      />
    </div>
  );
};

export default App;
