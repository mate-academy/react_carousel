import React, { useState } from 'react';
import { InputId, InputEvent, State } from './types';
import Carousel from './components/Carousel/Carousel';
import './App.scss';

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
  const [options, setOptions] = useState<State>({
    step: 3,
    margin: 15,
    frameSize: 4,
    itemWidth: 100,
    animationDuration: 500,
    infinite: false,
  });

  function handleInput(event: InputEvent) {
    if (event.target.id === 'infiniteId') {
      setOptions(prevOptions => ({
        ...prevOptions,
        [InputId[event.target.id]]: !prevOptions.infinite,
      }));

      return;
    }

    setOptions(prevOptions => ({
      ...prevOptions,
      [InputId[event.target.id]]: +event.target.value,
    }));
  }

  return (
    <div className="App">
      <h1 className="title" data-cy="title">{`Carousel with ${images.length} images`}</h1>
      <div className="App__wrapper">
        <label className="App__label" htmlFor="itemId">
          {'Item Width: '}
          <input
            className="App__input"
            id="itemId"
            type="number"
            min={70}
            max={260}
            step={5}
            value={options.itemWidth}
            onChange={handleInput}
          />
        </label>

        <label className="App__label" htmlFor="marginId">
          {'Item Margin: '}
          <input
            className="App__input"
            id="marginId"
            type="number"
            min={5}
            max={40}
            step={5}
            value={options.margin}
            onChange={handleInput}
          />
        </label>

        <label className="App__label" htmlFor="frameId">
          {'Frame Size: '}
          <input
            className="App__input"
            id="frameId"
            type="number"
            min={1}
            max={images.length}
            step={1}
            value={options.frameSize}
            onChange={handleInput}
          />
        </label>

        <label className="App__label" htmlFor="stepId">
          {'Step: '}
          <input
            className="App__input"
            id="stepId"
            type="number"
            min={1}
            max={options.frameSize}
            value={options.step}
            onChange={handleInput}
          />
        </label>

        <label
          className="App__label"
          htmlFor="animationDurationId"
        >
          {'Animation duration: '}
          <input
            className="App__input"
            id="animationDurationId"
            type="number"
            min={0}
            max={2500}
            step={250}
            value={options.animationDuration}
            onChange={handleInput}
          />
        </label>

        <label
          className="App__label"
          htmlFor="infiniteId"
        >
          Infinite :
          <input
            className="App__checkbox"
            id="infiniteId"
            type="checkbox"
            role="switch"
            onChange={handleInput}
          />
        </label>
      </div>

      <Carousel
        images={images}
        margin={options.margin}
        step={options.step}
        frameSize={options.frameSize}
        itemWidth={options.itemWidth}
        animationDuration={options.animationDuration}
        infinite={options.infinite}
      />
    </div>
  );
};

export default App;
