import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

const images: string[] = [
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
  const [inputs, setInputs] = useState({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  });

  const getMaxFrames = Math.floor(1300 / inputs.itemWidth);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.name === 'infinite'
      ? event.target.checked
      : event.target.value;

    setInputs({
      ...inputs,
      [event.target.name]: value,
    });
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form className="App__form" action="/">
        <label htmlFor="itemId" className="App__label">
          Box Width:
          <input
            className="App__input"
            type="number"
            id="itemId"
            name="itemWidth"
            min={130}
            max={390}
            step={20}
            value={inputs.itemWidth}
            onChange={handleInput}
          />
        </label>

        <label htmlFor="frameId" className="App__label">
          Frame Size:
          <input
            className="App__input"
            type="number"
            id="frameId"
            min={1}
            max={getMaxFrames}
            step={1}
            value={inputs.frameSize}
            onChange={handleInput}
          />
        </label>

        <label htmlFor="stepId" className="App__label">
          Step:
          <input
            className="App__input"
            type="number"
            id="stepId"
            min={1}
            max={10}
            step={1}
            value={inputs.step}
            onChange={handleInput}
          />
        </label>

        <label htmlFor="animationId" className="App__label">
          Animation Duration:
          <input
            className="App__input"
            type="number"
            id="animationId"
            min={500}
            max={5000}
            step={500}
            value={inputs.animationDuration}
            onChange={handleInput}
          />
        </label>

        <label htmlFor="infiniteId" className="App__label">
          Infinite:
          <input
            className="App__input App__bigInpute"
            type="checkbox"
            name="infinite"
            id="infiniteId"
            value={inputs.animationDuration}
            onChange={handleInput}
          />
        </label>
      </form>

      <Carousel
        images={images}
        itemWidth={inputs.itemWidth}
        frameSize={inputs.frameSize}
        step={inputs.step}
        animationDuration={inputs.animationDuration}
        infinite={inputs.infinite}
      />
    </div>
  );
};

export default App;
