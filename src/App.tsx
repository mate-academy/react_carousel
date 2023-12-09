import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

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

  const [data, setData] = useState<State>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1080,
    infinite: false,
  });

  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = data;

  function checkInfinite() {
    setData(currentData => ({
      ...currentData,
      infinite: true,
    }));

    if (infinite === true) {
      setData(currentData => ({
        ...currentData,
        infinite: false,
      }));
    }
  }

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy='title' className="App__header">Carousel with {images.length} images</h1>
      <div className="App__list">
        <label className="App__label">
          Item width:
          <input
            className="App__input"
            type="number"
            min={50}
            max={390}
            step={10}
            value={itemWidth}
            onChange={(event) => setData(currentData => ({
              ...currentData,
              itemWidth: +event.target.value,
            }))}
          />
        </label>

        <label className="App__label">
          Frame size:
          <input
            className="App__input"
            type="number"
            min={1}
            max={images.length}
            step={1}
            value={frameSize}
            onChange={(event) => setData(currentData => ({
              ...currentData,
              frameSize: +event.target.value,
            }))}
          />
        </label>

        <label className="App__label">
          Animation Duration:
          <input
            className="App__input"
            type="number"
            min={1000}
            value={animationDuration}
            onChange={(event) => setData(currentData => ({
              ...currentData,
              animationDuration: +event.target.value,
            }))}
          />
        </label>

        <label className="App__label">
          Infinite:
          <input
            className="App__input"
            type="checkbox"
            onChange={checkInfinite}
          />
        </label>

        <label className="App__label">
          Step:
          <input
            className="App__input"
            type="number"
            min={1}
            max={images.length}
            value={step}
            onChange={(event) => setData(currentData => ({
              ...currentData,
              step: +event.target.value,
            }))}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
