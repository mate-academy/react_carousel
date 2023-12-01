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
  const [carouselSettings, setCarouselSettings] = useState({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
    currentImage: 0,
    startingImage: 0,
  });

  const {
    itemWidth,
    frameSize,
    step,
    animationDuration,
    infinite,
    startingImage,
  } = carouselSettings;

  const setStartingImage = (value: number) => {
    return setCarouselSettings(prevState => ({
      ...prevState,
      startingImage: value,
    }));
  };

  return (
    <div className="App">
      <h1 data-cy="title" className="App__title">{`Carousel with ${images.length} images`}</h1>

      <div className="App__menu">
        <label htmlFor="itemId">Item width:</label>
        <input
          type="number"
          id="itemId"
          step="5"
          min="70"
          max="260"
          value={itemWidth}
          onChange={event => setCarouselSettings(prevState => ({
            ...prevState,
            itemWidth: Number(event.target.value),
          }))}
        />
        <br />
        <label htmlFor="frameId">Frame size:</label>
        <input
          type="number"
          id="frameId"
          step="1"
          min="1"
          max="10"
          value={frameSize}
          onChange={event => setCarouselSettings(prevState => ({
            ...prevState,
            frameSize: Number(event.target.value),
          }))}
        />
        <br />
        <label htmlFor="stepId">Step:</label>
        <input
          type="number"
          id="stepId"
          step="1"
          min="1"
          max="3"
          value={step}
          onChange={event => setCarouselSettings(prevState => ({
            ...prevState,
            step: Number(event.target.value),
          }))}
        />
        <br />
        <label htmlFor="animationDuration">Animation duration:</label>
        <input
          type="number"
          id="animationDuration"
          step="500"
          min="0"
          max="5000"
          value={animationDuration}
          onChange={event => setCarouselSettings(prevState => ({
            ...prevState,
            animationDuration: Number(event.target.value),
          }))}
        />
        <br />
        <label htmlFor="infinite">Infinite:</label>
        <input
          type="checkbox"
          id="infinite"
          name="infinite"
          onChange={() => setCarouselSettings(prevState => ({
            ...prevState,
            infinite: !prevState.infinite,
          }))}
        />
      </div>
      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
        startingImage={startingImage}
        setStartingImage={setStartingImage}
      />
    </div>
  );
};

export default App;
