import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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
  const [carouselSettings, setCarouselSettings] = useState({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
    currentImage: 0,
  });

  const {
    itemWidth,
    frameSize,
    step,
    animationDuration,
    infinite,
    currentImage,
  } = carouselSettings;

  const setCurrentImage = (value: number) => {
    return setCarouselSettings(prevState => ({
      ...prevState,
      currentImage: value,
    }));
  };

  return (
    <div className="App">
      <h1 data-cy="title" className="App__title">{`Carousel with ${images.length} images`}</h1>

      <div className="App__settings">
        <label
          htmlFor="itemId"
          className="App__label"
        >
          Item width:

          <input
            type="number"
            min="70"
            max="260"
            step="5"
            value={itemWidth}
            id="itemId"
            className="App__input"
            onChange={event => setCarouselSettings(prevState => ({
              ...prevState,
              itemWidth: +event.target.value,
            }))}
          />
        </label>

        <label
          htmlFor="frameId"
          className="App__label"
        >
          Frame size:

          <input
            type="number"
            min="1"
            max="10"
            step="1"
            value={frameSize}
            id="frameId"
            className="App__input"
            onChange={event => setCarouselSettings(prevState => ({
              ...prevState,
              frameSize: +event.target.value,
            }))}
          />
        </label>

        <label
          htmlFor="stepId"
          className="App__label"
        >
          Step:

          <input
            type="number"
            min="1"
            max="3"
            step="1"
            value={step}
            id="stepId"
            className="App__input"
            onChange={event => setCarouselSettings(prevState => ({
              ...prevState,
              step: +event.target.value,
            }))}
          />
        </label>

        <label className="App__label">
          Animation duration:

          <input
            type="number"
            min="0"
            max="5000"
            step="500"
            value={animationDuration}
            className="App__input"
            onChange={event => setCarouselSettings(prevState => ({
              ...prevState,
              animationDuration: +event.target.value,
            }))}
          />
        </label>

        <label className="App__label">
          Infinite:

          <input
            type="checkbox"
            className="App__switch"
            onChange={() => setCarouselSettings(prevState => ({
              ...prevState,
              infinite: !prevState.infinite,
            }))}
          />
        </label>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </div>
  );
};

export default App;
