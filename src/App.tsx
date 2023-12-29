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

interface State {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

export const App: React.FC = () => {
  const [state, setState] = useState<State>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  });

  const {
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = state;

  function toggleInfinite() {
    setState((currentState) => ({
      ...currentState,
      infinite: !infinite,
    }));
  }

  return (
    <div className="App">
      <h1 data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <div className="App__container">
        <label className="App__label" htmlFor="itemId">
          Item Width:
          <input
            className="App__input"
            type="number"
            id="itemId"
            min={50}
            max={390}
            step={5}
            value={itemWidth}
            onChange={(e) => setState(currentState => ({
              ...currentState,
              itemWidth: +e.target.value,
            }))}
          />
        </label>

        <label className="App__label" htmlFor="frameId">
          Frame Size:
          <input
            className="App__input"
            type="number"
            id="frameId"
            min={1}
            max={images.length}
            value={frameSize}
            onChange={(e) => setState(currentState => ({
              ...currentState,
              frameSize: +e.target.value,
            }))}
          />
        </label>

        <label className="App__label" htmlFor="stepId">
          Step:
          <input
            className="App__input"
            type="number"
            id="stepId"
            min={1}
            max={3}
            step={1}
            value={step}
            onChange={(e) => setState(currentState => ({
              ...currentState,
              step: +e.target.value,
            }))}
          />
        </label>

        <label className="App__label" htmlFor="animationId">
          Animation duration:
          <input
            className="App__input"
            type="number"
            id="animationId"
            min={500}
            max={3000}
            value={animationDuration}
            onChange={(e) => setState(currentState => ({
              ...currentState,
              animationDuration: +e.target.value,
            }))}
          />
        </label>

        <label className="App__label" htmlFor="infiniteId">
          Infinite:
          <input
            className="App__input"
            type="checkbox"
            id="infiniteId"
            onChange={toggleInfinite}
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
