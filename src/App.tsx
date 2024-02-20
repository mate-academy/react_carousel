import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
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

  const [state, setState] = useState({
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  });

  const setValue = (newState: Partial<State>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const MIN_FRAME_SIZE = 1;
  const MAX_FRAME_SIZE = 10;
  const MIN_STEP = 1;
  const MAX_STEP = 10;

  return (
    <div className="App">
      <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

      <form className="App__form">
        <label htmlFor="itemWidth" className="App__label">
          Item width
          <input
            className="App__input"
            type="number"
            id="itemWidth"
            defaultValue={state.itemWidth}
            onChange={event => setValue({ itemWidth: +event.target.value })}
          />
        </label>

        <label htmlFor="frameSize" className="App__label">
          Frame size
          <input
            className="App__input"
            type="number"
            min={MIN_FRAME_SIZE}
            max={MAX_FRAME_SIZE}
            id="frameSize"
            defaultValue={state.frameSize}
            onChange={event => setValue({ frameSize: +event.target.value })}
          />
        </label>

        <label htmlFor="step" className="App__label">
          Step
          <input
            className="App__input"
            type="number"
            id="step"
            defaultValue={state.step}
            min={MIN_STEP}
            max={MAX_STEP}
            onChange={event => setValue({ step: +event.target.value })}
          />
        </label>

        <label htmlFor="animationDuration" className="App__label">
          Animation duration
          <input
            className="App__input"
            type="number"
            id="animationDuration"
            defaultValue={state.animationDuration}
            onChange={event => setValue({
              animationDuration: +event.target.value,
            })}
          />
        </label>

        <label htmlFor="infinite">
          Infinite
          <input
            className="App__input App__input--checkbox"
            type="checkbox"
            id="infinite"
            checked={state.infinite}
            onChange={event => setValue({ infinite: event.target.checked })}
          />
        </label>
      </form>

      <Carousel
        images={images}
        itemWidth={state.itemWidth}
        frameSize={state.frameSize}
        step={state.step}
        animationDuration={state.animationDuration}
        infinite={state.infinite}
      />
    </div>
  );
};

export default App;
