import React, { useState } from 'react';

import './App.scss';
import Carousel from './components/Carousel';

export const App: React.FC = () => {
  const [carouselSettings, setCarouselSettings] = useState({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    count: 7,
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
  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
  } = carouselSettings;

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form className="App__form" action="/">
        <label htmlFor="NumberImages">
          Number of images

          <input
            className="App__input"
            type="number"
            value={frameSize}
            min={3}
            max={10}
            name="NumberImages"
            onChange={(event) => setCarouselSettings(prevState => ({
              ...prevState,
              frameSize: +event.target.value,
              count: (images.length - step) - images.length - prevState.count,
            }))}
          />
        </label>
        <label htmlFor="iteamWidth">
          Item Width

          <input
            className="App__input"
            type="number"
            value={itemWidth}
            name="iteamWidth"
            onChange={(event) => setCarouselSettings(prevState => ({
              ...prevState,
              itemWidth: +event.target.value,
            }))}
          />
        </label>

        <label htmlFor="imagesScrolled">
          Number of images scrolled

          <input
            className="App__input"
            type="number"
            value={step}
            min={1}
            max={9}
            name="imagesScrolled"
            onChange={(event) => setCarouselSettings(prevState => ({
              ...prevState,
              step: +event.target.value,
            }))}
          />
        </label>

        <label htmlFor="animationDuration">
          Animation Duration

          <input
            className="App__input"
            type="number"
            value={animationDuration}
            name="animationDuration"
            onChange={(event) => setCarouselSettings(prevState => ({
              ...prevState,
              animationDuration: +event.target.value,
            }))}
          />
        </label>
      </form>
      <Carousel
        images={images}
        frameSize={frameSize}
        itemWidth={itemWidth}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
