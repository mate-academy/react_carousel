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
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setframeSize] = useState(3);
  const [stepSize, setstepSize] = useState(3);
  const [animationDur, setanimationDur] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 className="App__title" data-cy="title">
        Carousel with {images.length} images
      </h1>

      <form action="" className="App__form">
        <label className="App__label" htmlFor="">
          Item Width:
          <input
            type="number"
            className="App__input"
            min={10}
            step={10}
            defaultValue={130}
            onChange={item => {
              const newValue = parseInt(item.target.value);

              setItemWidth(newValue);
            }}
          />
        </label>
        <label className="App__label" htmlFor="">
          Frame Size:
          <input
            type="number"
            className="App__input"
            min={1}
            max={10}
            defaultValue={3}
            onChange={item => {
              const newValue = parseInt(item.target.value);

              setframeSize(newValue);
            }}
          />
        </label>
        <label className="App__label" htmlFor="">
          Step:
          <input
            type="number"
            className="App__input"
            min={1}
            defaultValue={3}
            onChange={item => {
              const newValue = parseInt(item.target.value);

              setstepSize(newValue);
            }}
          />
        </label>
        <label className="App__label" htmlFor="">
          Animation Duration:
          <input
            type="number"
            className="App__input"
            min={1000}
            step={100}
            defaultValue={1000}
            onChange={item => {
              const newValue = parseInt(item.target.value);

              setanimationDur(newValue);
            }}
          />
        </label>
        <label className="App__label" htmlFor="">
          Infinite:
          <input
            type="checkbox"
            className="App__input App__input--checkbox"
            onChange={() => setInfinite(!infinite)}
          />
        </label>
      </form>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        stepSize={stepSize}
        animationDur={animationDur}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
