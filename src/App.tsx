import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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
  const [input, setInput] = useState({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    // infinite: false,
  });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;

    setInput({
      ...input,
      [name]: type === 'checkbox' ? checked : +value,
    });
  };

  const width = Math.floor(1300 / input.itemWidth);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form className="App__form">
        <label htmlFor="itemId">
          Item Width:
          <input
            id="itemId"
            className="App__input"
            name="itemWidth"
            type="number"
            min={130}
            max={390}
            step={5}
            value={input.itemWidth}
            onChange={handleChangeInput}
          />
        </label>

        <label htmlFor="frameId">
          Frame Size:
          <input
            id="frameId"
            className="App__input"
            name="frameSize"
            type="number"
            min={1}
            max={width}
            step={1}
            value={input.frameSize}
            onChange={handleChangeInput}
          />
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            className="App__input"
            name="step"
            type="number"
            min={1}
            max={images.length}
            step={1}
            value={input.step}
            onChange={handleChangeInput}
          />
        </label>

        <label htmlFor="animationId">
          Animation Duration:
          <input
            id="animationId"
            className="App__input"
            name="animationDuration"
            type="number"
            min={500}
            step={100}
            max={5000}
            value={input.animationDuration}
            onChange={handleChangeInput}
          />
        </label>

        {/* <label htmlFor="infinite">
          Infinite:
          <input
            id="infinite"
            className="App__input"
            name="infinite"
            type="checkbox"
            onChange={handleChangeInput}
          />
        </label> */}
      </form>

      <Carousel
        images={images}
        step={input.step}
        frameSize={input.frameSize}
        itemWidth={input.itemWidth}
        animationDuration={input.animationDuration}
        // infinite={input.infinite}
      />
    </div>
  );
};

export default App;
